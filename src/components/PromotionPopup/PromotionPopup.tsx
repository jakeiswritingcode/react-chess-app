import './PromotionPopup.css';
import { Button, Modal } from 'react-bootstrap';
import pieceSrcMap from '../Piece/pieceSrcMap';
import { useBoardContext } from '../../context/BoardContext';

const PromotionPopup = () => {
    const { turn, moves, movePiece, promotionData, setPromotionData } = useBoardContext();

    const promotePiece = (type: string) => {
        movePiece(promotionData.from, promotionData.to, type);
        setPromotionData({inProgress: false, to: '', from: '', promotions: []});
    };

    const cancelPromotion = () => {
        // TODO reset pieces to the most recent state stored (available when board history view is enabled
        // resetBoard() helper method?
        setPromotionData({inProgress: false, to: '', from: '', promotions: []});
    }

    return (
        <Modal show={promotionData.inProgress} onHide={cancelPromotion}>
            <Modal.Header closeButton>
                <Modal.Title>Choose Promotion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {promotionData.promotions.map((type) => (
                        <Button key={type} onClick={() => promotePiece(type)}>
                            <img src={pieceSrcMap[`${turn} ${type}`]} alt={type} style={{ width: 30, height: 30 }} />
                        </Button>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PromotionPopup;

import React from 'react';
import Modal from 'react-modal';
import AppButton from '../common/AppButton';


const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const SellTransferModal = ({
    isOpen,
    toggle,
    buttonTitle,
    onClick, 
    onChange
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggle}
            overlayClassName="request-modal-overlay"
            className="request-modal"
        >
            <div className="request-email pb--20">
                <div className="request--cancel">
                    <img src="/images/header/cross.svg" onClick={toggle} />
                </div>
                <input
                    className='modal__input'
                    type="text"
                    placeholder="price"
                    onChange ={onChange}
                />

                <div className="request--button" onClick={onClick}>
                    {buttonTitle}
                </div>
            </div>
        </Modal>
    );
};
export default SellTransferModal;

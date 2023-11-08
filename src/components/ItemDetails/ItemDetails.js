import backArrow from '../../images/arrow_back_black_24dp.svg';
import edit from '../../images/edit_black_24dp.svg'
import './ItemDetails.scss'

function ItemDetails() {
    return (
        <>
            <div className='item'>{/* container */}
                <div className='item__header'> {/* header */}
                    <div className='item__header-name'> <img className='item__logo' src={backArrow}></img>Item Name</div>
                    <button className='item__header-button'><img className='item__edit' src={edit}></img><div className='item__header-button--tablet'>Edit</div></button>
                </div>


                <div className='item__bottom-container'>
                    <div className='item__container-tablet1'> {/* item container for tablet mode */}
                        <div className='item__description-container'> {/* item container */}
                            <div className='item__label'>
                                Item Description:
                                <div className='item__description'>
                                    Item description like 50" 4k LED Item description like 50" 4k LED.
                                </div>
                            </div>
                        </div>

                        <div className='item__status-container'> {/* status container */}
                            <div className='item__container-top'>{/* left container */}
                                <div className='item__label'>
                                    Category:
                                    <div className='item__description'>
                                        Electronics
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='item__container-bottom'>
                        <div className='item__container-tablet2'>
                            <div className='item__container-bottom-left'>

                                <div className='item__label'>
                                    Status:
                                    <div className='item__instock'>IN STOCK</div>
                                </div>
                                <div className='item__label'>
                                    Warehouse:
                                    <div className='item__description'>
                                        Manhattan
                                    </div>
                                </div>
                            </div>
                            <div className='item__label item__label--quantity'>
                                Quantity:
                                <div className='item__description'>
                                    500
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ItemDetails;
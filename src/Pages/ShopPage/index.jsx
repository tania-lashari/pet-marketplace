import React, { useEffect } from 'react';
import shop_page_top from '../../assets/shop-page-top.png'
import AppButton from '../../common/AppButton';
import { DUMY_DATA } from '../../common/appData';
import ShopBuyCard from '../../Components/Shop/ShopBuyCard';
import ShopChanceCard from '../../Components/Shop/ShopChanceCard';


const ShopPage = ({ walletvalue, supply, loadNFTs, loadMyNFTs, loadWeb3 }) => {


    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])

    return (
        <div className='shop-page'>
            <div className='page__top'>
                <div className='top__content'>

                    <div className='content__heading'>Get Your Pets</div>
                    <div className='content__description'>
                        - Connect your wallet
                    </div>
                    <div className='content__description'>
                        - Buy a Mystery Box and meet your Pet.
                    </div>
                    <div className='content__description'>
                        - Stake your pet and earn rewards
                    </div>
                    <div className='content__description'>
                        - Trade pets on the marketplace
                    </div>
                    <div className='content__description'>
                        The rarer you pet, the higher staking reward you will enjoy or just sell at our marketplace
                    </div>
                </div>
                <img className='intro_pic' src={shop_page_top} />
            </div>
            {/* <div className='page__tokens'>
                <div className='app__heading'>Purchase ElonPets tokens on Pancakeswap
                </div>
                <AppButton title='BUY ZIVS NOW' />

            </div> */}

            <ShopBuyCard loadWeb3={loadWeb3} walletvalue={walletvalue} supply={supply} loadMyNFTs={loadMyNFTs} loadNFTs={loadNFTs} />
            <div className='app__heading'>
                You have a chance of receiving one of the below ElonPets!
            </div>
            <div className='page__chance-list'>
                {DUMY_DATA?.map((data) => {
                    return <ShopChanceCard data={data} />

                })}


            </div>

        </div>
    )
}

export default ShopPage
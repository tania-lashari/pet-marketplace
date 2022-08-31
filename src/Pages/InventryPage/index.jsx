import React, { useContext, useEffect, useState } from 'react'
import inventory from '../../assets/inventory.png'


import nft1 from '../../assets/nft1.gif';
import nft2 from '../../assets/nft2.gif';
import nft3 from '../../assets/nft3.gif';
import nft4 from '../../assets/nft4.gif';
import nft5 from '../../assets/nft5.gif';
import nft6 from '../../assets/nft6.gif';
import nft7 from '../../assets/nft7.gif';
import nft8 from '../../assets/nft8.gif';
import nft9 from '../../assets/nft9.gif';
import { DUMY_DATA } from '../../common/appData';
import { ActiveContext } from '../../App';
import InventoryCard from '../../Components/Inventory/InventoryCard';
import ListedCard from '../../Components/Inventory/ListedCard';


const InventryPage = () => {
    const {
        address,
        loadNFTs,
        walletconnect,
        loadWeb3, connectWallet, show, showmeta, showwallet, setShow, account, nfts, walletvalue, mynfts, listednfts
    } = useContext(ActiveContext);
    const [activeTab, setActiveTab] = useState("Inventory");

    return (
        <div className='inventory-page'>
            <div className='page__hero'>
                <div className='hero__content'>

                    <div className='content__heading'>Inventory</div>
                    <div className='content__description mb--20'>View all your Pets here! Now you can choose to participate in our staking pools to earn rewards or trade your pets at the marketplace to get one of your choices. Still not happy? head to our shop to get a new pet!</div>
                    <div className='content__description'>You can choose which staking pool to join
                    </div>
                    <div className='content__description'>Option 1: Standard Pool (No Locking Period)
                    </div>
                    <div className='content__description'>Option 2: 15 Days Pool (15 Days Locking Period)
                    </div>
                    <div className='content__description'>Option 3: 30 Days Pool (30 Days Locking Period) * There will be a 75% penalty for premature withdraw</div>

                </div>
                <img className='intro_pic' src={inventory} />
            </div>
            <div className='app__heading'>
                Your ElonPets
            </div>

            {address === 'Connect' ? <div className='app__description'>Connect your wallet to see your ElonPets</div> :
                <div className='page__tabs'>
                    <div className={activeTab === 'Inventory' ? `tab border-bottom-tab` : 'tab'} onClick={() => setActiveTab("Inventory")}>Inventory</div>
                    <div className={activeTab === 'Marketplace' ? `tab border-bottom-tab` : 'tab'} onClick={() => setActiveTab('Marketplace')}>Marketplace</div>
                    <div className={activeTab === 'Staking' ? `tab border-bottom-tab` : 'tab'} onClick={() => setActiveTab('Staking')}>Staking</div>
                </div>
            }



            {activeTab === 'Inventory' && <div className='inventory__nfts-list'>
                {mynfts?.map((data) => {
                    return <InventoryCard data={data} walletvalue={walletvalue} loadWeb3={loadWeb3} />

                })}

            </div>
            }
            {activeTab === 'Marketplace' && <div className='inventory__nfts-list'>
                {listednfts?.map((data) => {
                    return <ListedCard data={data} walletvalue={walletvalue} loadWeb3={loadWeb3} />

                })}

            </div>
            }
        </div>
    )
}

export default InventryPage
import React, { useEffect } from 'react'
import AppButton from '../../common/AppButton'
import Intro from '../../assets/introduction.png'
import getting_started from '../../assets/getting_started.gif'
import ConnectModal from "../../ConnectModal";


import nft1 from '../../assets/nft1.mp4';
import nft2 from '../../assets/nft2.mp4';
import nft3 from '../../assets/nft3.mp4';
import nft4 from '../../assets/nft4.mp4';
import nft5 from '../../assets/nft5.mp4';
import nft6 from '../../assets/nft6.mp4';
import nft7 from '../../assets/nft7.mp4';
import nft8 from '../../assets/nft8.mp4';
import nft9 from '../../assets/nft9.mp4';
import { Link } from 'react-router-dom';

const HomePage = ({ address, loadNFTs, walletconnect, setShow, show, showmeta, loadWeb3, account, connectWallet, showwallet, nfts, items, nftbuy, walletvalue }) => {



    const CHARACTER_LIST = [{
        nft: nft1,
        name: "Doge Coin"
    },
    {
        nft: nft2,
        name: "Elon Cat"
    },
    {
        nft: nft3,
        name: "Baby Doge"
    },
    {
        nft: nft4,
        name: "Dog Elon Mars"
    },
    {
        nft: nft5,
        name: "Shib Elon"
    },
    {
        nft: nft6,
        name: "Elon Floki"
    },
    {
        nft: nft7,
        name: "Cybertruck Doge"
    },
    {
        nft: nft8,
        name: "Elon Goat"
    },
    {
        nft: nft9,
        name: " Marvin Inu"
    }]


    return (
        <div className='home-page'>
            <div className='page__intro'>
                <div className='intro__content'>

                    <div className='content__heading'>Introducing</div>
                    <div className='content__description'>ElonPets is one of the most exciting projects in 2022 which features the cutest 3d NFT's on Binance smart chain, We’ve carried all famous memes and packaged them up into lovable pets you can stake them, use them in our p2e game, or even can sell them back on our marketplace.</div>
                    <div className="text-end d-flex justify-content-between">
                        {/* <div
                            className=" d-flex justify-content-end"
                            style={{ width: "100%" }}
                        >
                            <ConnectModal
                                setShow={setShow}
                                show={show}
                                loadWeb3={() => loadWeb3()}
                                account={account}
                                walletconnect={walletconnect}
                                showmeta={showmeta}
                                connectWallet={connectWallet}
                                showwallet={showwallet}
                                address={address}
                            />
                        </div> */}
                        {/* )} */}
                    </div>
                </div>
                <img className='intro_pic' src={Intro} />
            </div>
            <div className='page__characters'>
                <div className='characters__heading'>
                    Meet The Characters

                </div>
                <div className='characters__list'>
                    {
                        CHARACTER_LIST.map((val) => (
                            <div className='list__card'>
                                {/* <img src={val.nft} className='list__img' /> */}
                                {/* <video src={val.nft} autoplay loop muted playsinline className='list__img' type="video/mp4" /> */}
                                {/* <video className='list__img' autoPlay={true} >
                                    <source src={val.nft} type="video/mp4" />
                                </video> */}
                                <div dangerouslySetInnerHTML={{
                                    __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          src="${val.nft}"
          class="list__img"
        />,
      ` }}></div>

                                <div className='list__name'>{val.name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='page__started'>
                <img className='started_pic' src={getting_started} />
                <div className='started__content'>

                    <div className='content__heading'>Getting Started?</div>
                    <div className='content__description'>Getting started with ElonPets is easy, simply buy a mystery box in our shop by using the ElonPets Dapp. After purchasing, you can unlock your own pet, each with its rarity and staking multiplier. Simply choose to stake your pet in our staking pool to earn reward or to trade them for different ones in our marketplace!
                    </div>
                    <Link to="/shop" style={{ textDecoration: "none" }}>
                        <AppButton title='Buy a Mystery Box' />
                    </Link>

                </div>
            </div>

        </div>
    )
}

export default HomePage
import React, { useEffect, useState } from 'react'
import market from '../../assets/market.png'
import { DUMY_DATA } from '../../common/appData'
import MarketBuyCard from '../../Components/MarketPlace/MarketBuyCard'
import Web3 from "web3";



const MarketplacePage = ({ loadNFTs, hi, loadMyNFTs, setShow, show, showmeta, loadWeb3, account, connectWallet, showwallet, nfts, items, nftbuy, walletvalue, title, mynfts }) => {
    const [filterNfts, setFilterNfts] = useState([]);

    const [petsValue, setPetsValue] = useState('');
    const [petsPrice, setPetsPrice] = useState('');

    const handlePetsChange = (e) => {

        let { value } = e.target;
        setPetsValue(value);

        if (value === '' && petsPrice === '') {
            setFilterNfts(nfts)
        }
        else {
            let filterArray1 = nfts?.filter((val) => val.name.toLocaleLowerCase() == value.toLocaleLowerCase());
            if (value === '') filterArray1 = [...nfts];
            if (petsPrice !== '') {
                const filteArray2 = filterArray1?.filter((val) => val.rarity.toLocaleLowerCase() == petsPrice.toLocaleLowerCase());
                setFilterNfts(filteArray2);
                return
            }

            setFilterNfts(filterArray1);
        }


    }

    const handlePriceChange = (e) => {
        let { value } = e.target;

        setPetsPrice(value);
        if (value === '' && petsValue === '') {
            setFilterNfts(nfts)
        }
        else {
            let filteArray1 = nfts?.filter((val) => val.rarity.toLocaleLowerCase() == value.toLocaleLowerCase());
            if (petsValue !== '') {
                if (value === '') filteArray1 = [...nfts];
                const filteArray2 = filteArray1?.filter((val) => val.name.toLocaleLowerCase() == petsValue.toLocaleLowerCase());
                setFilterNfts(filteArray2);
                return
            }
            setFilterNfts(filteArray1);
        }


    }




    useEffect(() => {
        loadNFTs()
    }, []);
    useEffect(() => {
        setFilterNfts(nfts)
    }, [nfts])



    return (
        <div className='market-page'>
            <div className='page__hero'>
                <div className='hero__content'>

                    <div className='content__heading'>Marketplace</div>
                    <div className='content__description '>Welcome to the marketplace! Here, you can see all of the loveable ElonPets that are currently for sale by other users. Explore our marketplace to find one of your favourite ElonPets. Interested in putting one of your ElonPets up for sale? Head on over to your inventory.</div>

                </div>
                <img className='intro_pic' src={market} />
            </div>
            <div className='app__heading'>
                ElonPets For Sale
            </div>
            <div className='market__filters'>

                <select className='list__filter mr--20' value={petsValue} onChange={handlePetsChange}>
                    <option value="">All Pets</option>
                    <option value="Doge Coin">Doge Coin</option>
                    <option value="Elon Cat">Elon Cat</option>
                    <option value="Baby Doge">Baby Doge</option>
                    <option value="Dog Elon Mars">Dog Elon Mars</option>
                    <option value="Shib Elon">Shib Elon</option>
                    <option value="Elon Floki">Elon Floki</option>
                    <option value="Cybertruck Doge">Cybertruck Doge</option>
                    <option value="Elon Goat">Elon Goat</option>
                    <option value="Marvin Inu">Marvin Inu</option>
                </select>
                <select className='list__filter' value={petsPrice} onChange={handlePriceChange}>
                    <option value="">Sort Type</option>
                    <option value="common">Rarity Common</option>
                    <option value="uncommon">Rarity Uncommon</option>
                    <option value="rare">Rarity rare</option>
                    <option value="epic">Rarity Epic</option>
                    <option value="legendary">Rarity Legendary</option>
                    <option value="mythic">Rarity Mythic</option>

                </select>
            </div>
            <div className='buy__nfts-list'>
                {filterNfts?.map((data) => {
                    return <MarketBuyCard data={data} walletvalue={walletvalue} loadWeb3={loadWeb3} loadNFTs={loadNFTs} />

                })}


            </div>
            {/* <div className='app__description'>Connect your wallet to see your ElonPets</div> */}
        </div>
    )
}

export default MarketplacePage
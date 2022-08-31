import React from 'react'
import AppButton from '../../common/AppButton'


const ShopChanceCard = ({ data }) => {
    return (
        <div className='shop__chance-card'>
            <div className='card__content'>
                <div className='content__left'>{data.name}</div>
                <div className='content__right'>{data.times}</div>

            </div>
            {/* <img src={data.nft} className='card__nft' /> */}
            <div dangerouslySetInnerHTML={{
                __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          src="${data.nft}"
          class="card__nft"
        />,
      ` }}></div>
            <div className='card__content'>
                <div className='content__left'>Rarity</div>
                <div className='content__right'>{data.rarity}</div>

            </div>
            <div className='card__content'>
                <div className='content__left'>Opening Chance</div>
                <div className='content__right'>{data.openingChance}</div>

            </div>
            <div className='card__content'>
                <div className='content__left'>No Lock APY:</div>
                <div className='content__right'>{data.NoLockApy}</div>

            </div>
            <div className='card__content'>
                <div className='content__left'>15 Day Lock APY:</div>
                <div className='content__right'>{data.midMonthApy}</div>

            </div>
            <div className='card__content'>
                <div className='content__left'>30 Day Lock APY:</div>
                <div className='content__right'>{data.monthApy}</div>

            </div>


        </div>
    )
}

export default ShopChanceCard
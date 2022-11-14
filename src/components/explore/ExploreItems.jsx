import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import { useState } from "react";
import { useEffect } from "react";
import ExpiryDate from "../home/ExpiryDate";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(8);

  async function getExploreItems() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreItems(data);
    setLoading(false);
  }

  async function exploreFilter(filter) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    setExploreItems(data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getExploreItems();
  }, []);

  return (
    <>
      {loading ? (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              data-aos="fade in"
              data-aos-delay="200"
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width={310} height={400} borderRadius={1} />
            </div>
          ))}
        </>
      ) : (
        <div>
          <select
            id="filter-items"
            defaultValue=""
            onChange={(e) => exploreFilter(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      )}
      {exploreItems
        .slice(0, loadMore)
        .map(
          (
            {
              authorImage,
              nftImage,
              title,
              likes,
              nftId,
              authorId,
              price,
              expiryDate,
            },
            index
          ) => (
            <div
              data-aos="fade in"
              data-aos-delay="200"
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {expiryDate ? <ExpiryDate expiryDate={expiryDate} /> : ""}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${nftId}`}>
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nftId}`}>
                    <h4>{title}</h4>
                  </Link>
                  <div className="nft__item_price">{price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{likes}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      <div className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={() => setLoadMore(loadMore + 4)}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;

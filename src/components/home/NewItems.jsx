import React from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import { useState } from "react";
import { useEffect } from "react";
import ExpiryDate from "./ExpiryDate";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getNewItems() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getNewItems();
  }, []);

  const settings = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    autoplay: false,
    navText: ["<", ">"],
    smartSpeed: 600,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading ? (
            <OwlCarousel className="slider-items owl-carousel" {...settings}>
              {new Array(4).fill(0).map((_, index) => (
                <div
                  data-aos="fade-in"
                  data-aos-delay="200"
                  className=""
                  key={index}
                >
                  <div className="nft__item">
                    <div className="nft__item_wrap">
                      <Skeleton width={340} height={340} borderRadius={5} />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width={120} height={36} borderRadius={5} />
                      <div className="nft__item_price">
                        <Skeleton width={100} height={24} borderRadius={5} />
                      </div>
                      <div className="nft__item_like">
                        <span>
                          <Skeleton width={36} height={26} borderRadius={5} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="slider-items owl-carousel" {...settings}>
              {newItems.map(
                (
                  {
                    nftId,
                    nftImage,
                    price,
                    title,
                    likes,
                    authorImage,
                    expiryDate,
                    authorId,
                  },
                  index
                ) => (
                  <div
                    data-aos="fade-in"
                    data-aos-delay="200"
                    className=""
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {expiryDate && <ExpiryDate expiryDate={expiryDate} />}

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
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;

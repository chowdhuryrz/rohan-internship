import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTopSeller() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setTopSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    getTopSeller();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                <>
                  {new Array(12).fill(0).map((_, index) => (
                    <li data-aos="fade-in" data-aos-delay="200" key={index}>
                      <div className="author_list_pp">
                        <Skeleton width={48} height={52} borderRadius={1000} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={75} borderRadius={1} />
                        <span>
                          <Skeleton width={38} height={20} borderRadius={1} />
                        </span>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {topSellers.map(
                    (
                      { price, authorId, authorImage, id, authorName },
                      index
                    ) => (
                      <li data-aos="fade-in" data-aos-delay="200" key={index}>
                        <div className="author_list_pp">
                          <Link to={`/author/${authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${authorId}`}>{authorName}</Link>
                          <span>{price} ETH</span>
                        </div>
                      </li>
                    )
                  )}
                </>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

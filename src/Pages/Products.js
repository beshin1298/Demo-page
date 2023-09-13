import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { responseAxios } from "../Untils/Axios";
import { formatMoney } from "../Untils/MoneyFormatter";
import { Rate, Input } from "antd";
import usePageBottom from "./usePageBottom";
const { Search } = Input;
const Products = () => {
  let reachedBottom = usePageBottom();

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [paging, setPaging] = useState(20);
  async function getAllProducts() {
    const urlApi = `https://dummyjson.com/products/search?q=${searchInput}&limit=${paging}`;
    const res = await responseAxios("GET", urlApi).catch((e) => {
      console.log(e);
    });
    if (res?.status === 200) {
      setProducts(res.data);
    }
  }
  function checkPageBottom() {
    console.log("reachedBottom", reachedBottom);
    if (reachedBottom === true) {
      if (paging === 100) {
        reachedBottom = false;
      } else {
        setPaging((value) => value + 20);
        reachedBottom = false;
      }
    }
  }
  useMemo(() => {
    getAllProducts();
  }, [searchInput, paging]);
  useEffect(() => {
    checkPageBottom();
  }, [reachedBottom]);
  return (
    <Product>
      <div>
        <h1>DANH SÁCH SẢN PHẨM</h1>{" "}
      </div>

      <Search
        placeholder="Tìm kiếm tên sản phẩm"
        allowClear
        style={{
          width: 500,
        }}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setPaging(0);
        }}
      />
      {products.total === 0 ? (
        <div>
          <h1 style={{ color: "red" }}>Không tìm thấy tên sản phẩm</h1>
        </div>
      ) : (
        <ul className="mystyle-products">
          {products.products?.map((product, index) => {
            return (
              <li className="product" key={index}>
                <a href="#">
                  <img
                    alt=""
                    className="attachment-shop_catalog "
                    src={product.thumbnail}
                    width={400}
                    height={400}
                  />
                  <h3>{product.title}</h3>
                  <span className="price">
                    <del>
                      {" "}
                      <span className="amount">
                        {formatMoney(
                          product.price / (1 - product.discountPercentage / 100)
                        )}
                      </span>{" "}
                    </del>
                    <ins>
                      {" "}
                      <span className="amount">
                        {formatMoney(product.price)}
                      </span>{" "}
                    </ins>
                    <span className="sale-tag sale-tag-square">
                      -{product.discountPercentage}%
                    </span>
                  </span>
                </a>
                <a
                  href="#"
                  className="btn btn-dark btn-circle btn-review"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Quick View"
                >
                  <i className="ion ion-ios-move"></i>
                </a>
                <Rate disabled allowHalf defaultValue={product.rating} />{" "}
                {product.rating}
                {product.stock === 0 ? (
                  <div style={{ color: "red" }}>Đã hết hàng</div>
                ) : (
                  <div className="product-stock">
                    {product.stock} Sản phẩm có sẵn
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Product>
  );
};
const Product = styled.div`
  background: #f4f4f4;
  font-family: sans-serif;
  img {
    max-width: 100%;
  }
  .mystyle-products {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    .product-stock {
      opacity: 0.6;
    }
    @media (max-width: 600px) {
      display: block;
    }

    &.slider-products {
      .product {
        width: auto;
        margin-bottom: 0;
      }
    }

    .product {
      width: 20%;
      margin-bottom: 20px;
      position: relative;
      padding: 20px;
      background: #fff;
      @media (max-width: 768px) {
        width: 50%;
      }
      @media (max-width: 600px) {
        width: auto;
      }
      &:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        z-index: 7;

        .btn-circle {
          transform: translateY(0);
          visibility: visible;
          opacity: 1;
        }
      }

      h3 {
        font-size: 12px;
        line-height: 20px;
        margin-top: 10px;
        height: 39px;
        overflow: hidden;
        @media (max-width: 600px) {
          height: auto;
        }
      }

      > a {
        position: relative;
        display: block;
        color: #333;
        text-decoration: none;

        &:hover {
          text-decoration: none;
        }
      }

      .add_to_cart_button {
        display: none;
      }

      .attachment-shop_catalog {
        display: block;
        margin: 0 auto;
      }

      .btn-circle {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        display: block;
        padding: 0;
        position: absolute;
        top: 20%;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        z-index: 2;
        color: #fff;
        transform: translateY(-20px);
        opacity: 0;
        visibility: hidden;
        transition: color 0.5s 0.001s ease-out, background 0.3s 0.001s ease-out,
          visibility 0.5s 0.25s ease-out, opacity 0.5s 0.25s ease-out,
          transform 0.5s 0.25s ease-out;
      }

      .price {
        font-size: 14px;

        ins {
          text-decoration: none;
          font-weight: 700;
          white-space: nowrap;
        }

        del {
          color: #666;
          font-size: 11px;
          padding-right: 7px;
          white-space: nowrap;
        }

        .sale-tag {
          color: red;
          font-size: 12px;
          padding-left: 7px;
          font-weight: 700;
        }
      }
    }

    .onsale {
      z-index: 6;
      position: absolute;
      top: 15px;
      left: -20px;
      padding: 2px 10px;
      background: var(--red);
      color: #fff;
      box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.3);
      border-radius: 0 5px 5px 0;
      height: 25px;
      line-height: 25px;
      font-size: 0.8rem;
      font-weight: normal;
      padding-top: 0;
      padding-bottom: 0;
      min-height: 0;

      &:before,
      &:after {
        content: "";
        position: absolute;
      }

      &:before {
        width: 7px;
        height: 33px;
        top: 0;
        left: -6.5px;
        padding: 0 0 7px;
        background: inherit;
        border-radius: 5px 0 0 5px;
      }

      &:after {
        width: 5px;
        height: 5px;
        bottom: -5px;
        left: -4.5px;
        border-radius: 5px 0 0 5px;
        background: #800;
      }
    }
  }
`;
export default Products;

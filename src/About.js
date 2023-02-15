import React, { useEffect, useRef } from "react";
import "./about.scss";
import $ from "jquery";
import Swiper from "react-id-swiper";
import "swiper/swiper.scss";
import { Autoplay, Swiper as RealSwiper } from "swiper";
import Footer from "../common/Footer/Footer";
import NextProject from "./../common/NextProject/NextProject";
import DelayLink from "../common/Header/DelayLink";
import Scrollbar from "smooth-scrollbar";

const About = () => {
  const sec6 = useRef();
  const params1 = {
    slidesPerView: "auto",
    loop: true,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
    },
    speed: 17000,
  };

  const scrollAnimation = () => {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const scrollBottom = scrollTop + windowHeight;

    /* sec1 */
    const $sec1 = $(".sec1");
    const $sec1Inner = $sec1.find(".inner");
    const sec3Top = $(".sec3")[0] ? $(".sec3").offset().top : 0;
    const sec2MarQueeTop = $(".sec2 .marquee")[0] ? $(".sec2 .marquee").offset().top : 0;
    const opacity = (sec3Top - scrollTop - windowHeight / 10) / windowHeight;

    if (scrollTop > sec3Top) {
      if (!$sec1.hasClass("hide")) {
        $sec1.addClass("hide");
      }
    } else {
      if ($sec1.hasClass("hide")) {
        $sec1.removeClass("hide");
      }
    }

    if (scrollBottom > sec2MarQueeTop && opacity >= 0) {
      $sec1Inner.css({ opacity: opacity });
    }

    /* sec3 */
    const $sec3Imglists = $(".sec3 .img-lists");
    const $sec3ImglistsLi = $sec3Imglists.find("li");
    const sec3ImgListsLength = $sec3ImglistsLi.length;
    const sec3ImgTop = $sec3Imglists[0] ? $sec3Imglists.offset().top : 0;
    const sec3ImgBottom = sec3ImgTop + $sec3Imglists.height() + $(window).height();
    const activeDistance = (sec3ImgBottom - sec3ImgTop) / sec3ImgListsLength;

    if (scrollBottom > sec3ImgTop && scrollBottom < sec3ImgBottom) {
      const nth = Math.floor((scrollBottom - sec3ImgTop) / activeDistance);
      $sec3ImglistsLi.eq(nth).addClass("active").siblings().removeClass("active");
    }

    /* background */
    const $scrollWrap = $(".scroll-wrap");
    const $sec3 = $(".sec3");
    const $sec4 = $(".sec4");
    const $sec5 = $(".sec5");
    const $sec6 = $(".sec6");
    const sec4TopPoint = ($sec4[0] ? $sec4.offset().top : 0) + windowHeight * 0.3;
    const sec5TopPoint = ($sec5[0] ? $sec5.offset().top : 0) + windowHeight * 0.65;
    const sec6TopPoint = ($sec6[0] ? $sec6.offset().top : 0) + windowHeight * 0.75;

    if (scrollBottom > sec4TopPoint) {
      if (scrollBottom <= sec5TopPoint) {
        if (!$scrollWrap.hasClass("color-ececec")) {
          $scrollWrap.addClass("color-ececec");
        }

        if ($scrollWrap.hasClass("color-000")) {
          $scrollWrap.removeClass("color-000");
        }

        if (!$sec3.hasClass("active")) {
          $sec3.addClass("active");
        }

        if (!$sec4.hasClass("color-ececec")) {
          $sec4.addClass("color-ececec");
        }
      }
    } else {
      if ($scrollWrap.hasClass("color-ececec")) {
        $scrollWrap.removeClass("color-ececec");
      }

      if ($sec3.hasClass("active")) {
        $sec3.removeClass("active");
      }

      if ($sec4.hasClass("color-ececec")) {
        $sec4.removeClass("color-ececec");
      }
    }

    if (scrollBottom > sec5TopPoint && scrollBottom <= sec6TopPoint) {
      if ($scrollWrap.hasClass("color-ececec")) {
        $scrollWrap.removeClass("color-ececec");
      }

      if (!$scrollWrap.hasClass("color-000")) {
        $scrollWrap.addClass("color-000");
      }

      if ($sec4.hasClass("color-ececec")) {
        $sec4.removeClass("color-ececec");
      }
    }

    if (scrollBottom > sec6TopPoint) {
      if (!$scrollWrap.hasClass("color-fff")) {
        $scrollWrap.addClass("color-fff");
      }
    } else {
      if ($scrollWrap.hasClass("color-fff")) {
        $scrollWrap.removeClass("color-fff");
      }
    }
  };

  const sec6ScrollAnimation = ({ offsetY }) => {
    const scrollTop = !!offsetY ? offsetY : window.scrollY;
    const windowHeight = $(window).height();
    const scrollBottom = scrollTop + windowHeight;
    const $imgBox = $(".sec6 .right.step1 .img-box");
    const sec6ImgBoxTop = !!offsetY ? ($imgBox[0] ? $imgBox.offset().top + scrollTop : 0) : $imgBox[0] ? $imgBox.offset().top : 0;
    const y = (scrollBottom - sec6ImgBoxTop) / 5;

    if (scrollBottom > sec6ImgBoxTop) {
      $(sec6.current).css({ transform: `translateY(${y}px)` });
    }
  };

  const options = {
    damping: 0.07,
  };

  useEffect(() => {
    RealSwiper.use([Autoplay]);

    const scrollbar = Scrollbar.init(document.querySelector(".scroll-container"), options);
    scrollbar.addListener(({ offset }) => {
      scrollAnimation();
      sec6ScrollAnimation({ offsetY: offset.y });
    });

    scrollAnimation();
    window.addEventListener("resize", scrollAnimation);
    window.addEventListener("resize", sec6ScrollAnimation);
    window.addEventListener("scroll", scrollAnimation);
    window.addEventListener("scroll", sec6ScrollAnimation);

    return () => {
      window.removeEventListener("resize", scrollAnimation);
      window.removeEventListener("resize", sec6ScrollAnimation);
      window.removeEventListener("scroll", scrollAnimation);
      window.removeEventListener("scroll", sec6ScrollAnimation);
      $(".sec1 .inner").removeAttr("style");
    };
  });

  return (
    <div className="about">
      <div className="sec1">
        <div className="inner">
          <div className="pc">
            <h1 className="step1 ani">
              <span>
                이 세상이
                <img src="./images/about_sec1_img1.png" alt="" />
              </span>
            </h1>
            <h1 className="step2 ani">
              <span>
                <div className="video">
                  <div style={{ padding: "45.83% 0 0 0", position: "relative" }}>
                    <iframe
                      src="https://player.vimeo.com/video/767208325?h=bf8ba6fbc7&controls=0&autopause=0&background=1"
                      title="work_movement"
                      style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <span className="noto-font">(우리)</span>가 원하는
                <img src="./images/about_sec1_img4.png" alt="" />
              </span>
            </h1>
            <h1 className="step3 ani">
              <span>
                모습이
                <img src="./images/about_sec1_img2.png" alt="" />
                아니라면
              </span>
            </h1>
            <h1 className="step4 ani">
              <span>
                <img src="./images/about_sec1_img5.png" alt="" className="img1" />
                만들어
                <img src="./images/about_sec1_img3.png" alt="" className="img2" />
                보자
              </span>
            </h1>
          </div>
          <div className="mo">
            <h1 className="step1 ani">
              <span>이 세상이</span>
            </h1>
            <h1 className="step2 ani">
              <span>
                <img src="./images/about_sec1_img1.png" alt="" />
              </span>
            </h1>
            <h1 className="step3 ani">
              <span>
                <div className="video">
                  <div style={{ padding: "45.83% 0 0 0", position: "relative" }}>
                    <iframe
                      src="https://player.vimeo.com/video/767208325?h=bf8ba6fbc7&controls=0&autopause=0&background=1"
                      title="work_movement"
                      style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <span className="noto-font">(우리)</span>가
              </span>
            </h1>
            <h1 className="step4 ani">
              <span>
                원하는
                <img src="./images/about_sec1_img4.png" alt="" />
                모습이
              </span>
            </h1>
            <h1 className="step5 ani">
              <span>
                <img src="./images/about_sec1_img2.png" alt="" />
                아니라면
              </span>
            </h1>
            <h1 className="step6 ani">
              <span>
                <img src="./images/about_sec1_img5.png" alt="" />
              </span>
            </h1>
            <h1 className="step7 ani">
              <span>
                만들어
                <img src="./images/about_sec1_img3.png" alt="" />
                보자
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="scroll-container">
        <div className="scroll-wrap">
          <div className="sec2">
            <p className="marquee">
              think thing thank <i className="pd-font">Creative Group</i>
            </p>
          </div>
          <div className="sec3">
            <div className="video-box">
              <div className="video">
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    src="https://player.vimeo.com/video/767208691?h=fedb957259&controls=0&autopause=0&background=1"
                    title="aboout_new_world"
                    style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="inner">
              <div className="text-box">
                <div className="p-box">
                  <p className="step1 ani2">
                    <span>띵띵땡은 이 세상 속에 있는 고정관념에서 벗어나 열정과 용기가 있는 자유로운 영혼을 가지며 세상의 미지한 것들을 찾아 나갑니다.</span>
                  </p>
                  <p className="step2 ani2">
                    <span>
                      이 미지한 것들은 새로운 것에 대한 상상과 세상에 대한 가능성을 느끼게 해주고 어두운 곳을 비추는 빛 처럼 아무것도 없는 공간에 다양한
                      영혼들이 모여 세상을 확장할 수 있습니다.
                    </span>
                  </p>
                </div>
                <div className="scrolling-box">
                  <h3 className="pc ani">
                    <span>띵띵땡의 Blank 형태는 우리만의</span>
                    <span>메세지와 우리가 생각하는</span>
                    <span>모든 것을 담아낼 수 있는</span>
                    <span>세계관이자 끝없는 상상력과</span>
                    <span>가능성을 상징합니다.</span>
                  </h3>
                  <h3 className="mo ani">
                    <span>띵띵땡의 Blank 형태는</span>
                    <span>우리만의 메세지와</span>
                    <span>우리가 생각하는</span>
                    <span>모든 것을 담아낼 수 있는</span>
                    <span>세계관이자 끝없는</span>
                    <span>상상력과 가능성을</span>
                    <span>상징합니다.</span>
                  </h3>
                  <ul className="img-lists">
                    <li>
                      <img src="./images/about/1.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/2.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/3.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/4.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/5.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/6.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/7.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/8.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/9.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/10.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/11.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/12.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/13.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/14.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/15.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/16.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/17.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/18.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/19.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/20.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/21.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/22.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/23.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/24.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/25.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/26.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/27.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/28.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/29.png" alt="" />
                    </li>
                    <li>
                      <img src="./images/about/30.png" alt="" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="sec4">
            <div className="inner">
              <ul className="lists">
                <li>
                  <div className="title-box">
                    <h2 className="ani">
                      <span>FIRST,</span>
                    </h2>
                    <h2 className="ani">
                      <span>WE think</span>
                      <DelayLink to="/work-creative">
                        <span className="arrow-txt ani">
                          <span className="txt-wrap">
                            SEE MORE
                            <span className="arrow">
                              <span className="step1"></span>
                              <span className="step2"></span>
                            </span>
                            <span className="txt-wrap">think(Creative) PROJECT</span>
                          </span>
                        </span>
                      </DelayLink>
                    </h2>
                    <p className="step1 ani">
                      <span>
                        Be freed, with endless imagination
                        <br />
                        to think in different perspective
                      </span>
                    </p>
                    <p className="step2 pc ani">
                      <span>
                        자유롭게 상상하며 다양한 관점으로 바라봄으로써 창의적인 기획과
                        <br />
                        의미있는 디자인으로 관중들에게 특별한 경험과 스토리를 선보이고
                        <br />
                        모두에게 좋은 영감을 줄 수 있는 프로젝트들을 창출합니다.
                      </span>
                    </p>
                    <p className="step2 mo ani">
                      <span>
                        자유롭게 상상하며 다양한 관점으로 바라봄으로써
                        <br />
                        창의적인 기획과 의미있는 디자인으로 관중들에게
                        <br />
                        특별한 경험과 스토리를 선보이고 모두에게 좋은
                        <br />
                        영감을 줄 수 있는 프로젝트들을 창출합니다.
                      </span>
                    </p>
                  </div>
                  <div className="circle-lists">
                    <ol>
                      <li className="ani2">
                        <div className="text-wrap">
                          <span className="num">01</span>
                          <p>
                            unique brand
                            <br />
                            identity making
                          </p>
                          <span className="bottom-txt">(BX)&nbsp;&nbsp;&nbsp;(BI + BM)</span>
                        </div>
                      </li>
                      <li className="ani2">
                        <div className="text-wrap">
                          <span className="num">02</span>
                          <p>
                            immersive space
                            <br />
                            experience making
                          </p>
                          <span className="bottom-txt">(UX)&nbsp;&nbsp;&nbsp;(SI + SM)</span>
                        </div>
                      </li>
                      <li className="ani2">
                        <div className="text-wrap">
                          <span className="num">03</span>
                          <p>
                            total creative
                            <br />
                            proposal & design
                          </p>
                          <span className="bottom-txt">(BM + PM + MA)</span>
                        </div>
                      </li>
                    </ol>
                  </div>
                </li>
                <li>
                  <div className="title-box">
                    <h2 className="ani">
                      <span>THEN,</span>
                    </h2>
                    <h2 className="ani">
                      <span>ABOUT thing</span>
                      <DelayLink to="/work-business">
                        <span className="arrow-txt ani">
                          <span className="txt-wrap">
                            SEE MORE
                            <span className="arrow">
                              <span className="step1"></span>
                              <span className="step2"></span>
                            </span>
                            <span className="txt-wrap">thing(Business) PROJECT</span>
                          </span>
                        </span>
                      </DelayLink>
                    </h2>
                    <p className="step1 ani">
                      <span>
                        Different together, we gather
                        <br />
                        to make thing with good impact
                      </span>
                    </p>
                    <p className="step2 pc ani">
                      <span>
                        창의적인 요소들을 만드는 것에서 그치지 않고 새로운 경험을 창출하는
                        <br />
                        의미있는 순간과 모든 세상에 긍정적 영향이 발현될 수 있기 위한
                        <br />
                        지속가능성을 항상 생각합니다.
                      </span>
                    </p>
                    <p className="step2 mo ani">
                      <span>
                        창의적인 요소들을 만드는 것에서 그치지 않고
                        <br />
                        새로운 경험을 창출하는 의미있는 순간과 모든 세상에
                        <br />
                        긍정적 영향이 발현될 수 있기 위한 지속가능성을
                        <br />
                        항상 생각합니다.
                      </span>
                    </p>
                  </div>
                  <div className="earth-lists ani">
                    <ul>
                      <li>
                        <p>
                          <span>
                            o<span className="pd-font">ff</span>line
                            <br />
                            business
                          </span>
                          <span>
                            o<span className="pd-font">n</span>line
                            <br />
                            business
                          </span>
                        </p>
                      </li>
                      <li>
                        <div className="video">
                          <div style={{ padding: "100% 0 0 0", position: "relative" }}>
                            <img src="./images/O&O.gif" alt="" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="title-box">
                    <h2 className="ani">
                      <span>JUST,</span>
                    </h2>
                    <h2 className="ani">
                      <span>TO thank</span>
                      <DelayLink to="/work-social">
                        <span className="arrow-txt ani">
                          <span className="txt-wrap">
                            SEE MORE
                            <span className="arrow">
                              <span className="step1"></span>
                              <span className="step2"></span>
                            </span>
                            <span className="txt-wrap">thing(Social) PROJECT</span>
                          </span>
                        </span>
                      </DelayLink>
                    </h2>
                    <p className="step1 ani">
                      <span>
                        Love life, sharing good energy
                        <br />
                        to make the world meaningful
                      </span>
                    </p>
                    <p className="step2 ani">
                      <span>
                        최종적으로 긍정적인 것들이 계속 유지될 수 있는
                        <br />
                        지속가능성을 통해 사회 전체에 긍정적인 영향을
                        <br />
                        창출하고 나타낼 수 있도록 합니다.
                      </span>
                    </p>
                  </div>
                  <div className="thank-lists">
                    <ul>
                      <li className="ani2">
                        <div className="li-wrap">
                          <span className="title">Creative Interaction</span>
                          <ul>
                            <li className="oval">
                              <div className="text-box">
                                O<span className="pd-font">FF</span>LINE
                                <br />
                                Interaciton
                              </div>
                              <div className="text-box">
                                O<span className="pd-font">N</span>LINE
                                <br />
                                Interaction
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="ani2">
                        <div className="li-wrap">
                          <span className="title">Social Project</span>
                          <div className="sec4-img1">
                            <img src="./images/about_sec4_img1.png" alt="" />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="sec5">
            <div className="wrap">
              <h2 className="ani">
                <span>
                  <i className="pd-font">O</i>ur A<i className="pd-font">tt</i>
                  itude
                </span>
              </h2>
              <div className="react-swiper linear marquee ani">
                <Swiper {...params1}>
                  <div>
                    <div className="rolling">
                      <div className="text-box">
                        <span>
                          be<sup>(a)</sup>
                        </span>
                        <span>free</span>
                      </div>
                      <img src="./images/about_our_attitude_img1.png" alt="" className="img1" />
                      <div className="text-box">
                        <span>
                          different<sup>(b)</sup>
                        </span>
                        <span>together</span>
                      </div>
                      <img src="./images/about_our_attitude_img2.png" alt="" className="img2" />
                      <div className="text-box">
                        <span>
                          love<sup>(c)</sup>
                        </span>
                        <span>life</span>
                      </div>
                      <img src="./images/about_our_attitude_img3.png" alt="" className="img3" />
                    </div>
                  </div>
                  <div>
                    <div className="rolling">
                      <div className="text-box">
                        <span>
                          be<sup>(a)</sup>
                        </span>
                        <span>free</span>
                      </div>
                      <img src="./images/about_our_attitude_img1.png" alt="" className="img1" />
                      <div className="text-box">
                        <span>
                          different<sup>(b)</sup>
                        </span>
                        <span>together</span>
                      </div>
                      <img src="./images/about_our_attitude_img2.png" alt="" className="img2" />
                      <div className="text-box">
                        <span>
                          love<sup>(c)</sup>
                        </span>
                        <span>life</span>
                      </div>
                      <img src="./images/about_our_attitude_img3.png" alt="" className="img3" />
                    </div>
                  </div>
                </Swiper>
              </div>
              <div className="p-box ani">
                <p>
                  <span>그리고 이를 위해 띵띵땡은,</span>
                </p>
                <p>
                  <span>
                    <span className="pd-font">(a)</span> 자유로운 관점으로 세상을 바라보며
                  </span>
                </p>
                <p>
                  <span>
                    <span className="pd-font">(b)</span> 서로 다르더라도 다르기에 함께 모여
                  </span>
                </p>
                <p>
                  <span>
                    <span className="pd-font">(c)</span> 서로 사랑하고 존중하며 나아가고 있습니다.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="sec6" ref={sec6}>
            <div className="inner">
              <div className="right step1">
                <div className="img-box ani">
                  <img src="./images/about_sec6_img1.png" alt="" className="img1 pc" />
                  <img src="./images/about_sec6_img1_m.png" alt="" className="img1 mo" />
                </div>
              </div>
              <div className="title-box">
                <h1 className="ani">
                  <span>
                    AND,
                    <span className="img">
                      <img src="./images/about_sec6_img3.png" alt="think thing thank" className="white-img" />
                      <img src="./images/about_sec6_img3_black.png" alt="think thing thank" className="black-img" />
                    </span>
                  </span>
                </h1>
                <h1 className="ani">
                  <span>MAKING GOOD</span>
                </h1>
                <h1 className="ani">
                  <i>Movement</i>
                </h1>
              </div>
              <div className="right step2">
                <div className="wrap">
                  <div className="img-box ani">
                    <img src="./images/about_sec6_img2.png" alt="" className="img2" />
                  </div>
                  <div className="text-box pc ani">
                    <p>
                      <span>
                        띵띵땡은 사람과 사물을 관찰하고 이에 따른&nbsp;
                        <span className="light">스토리 디자인</span>을 지향합니다.
                      </span>
                    </p>
                    <p>
                      <span>이런 과정을 통해서 한개, 한개의 프로젝트가 세상에 나올 때마다 조금씩이지만</span>
                    </p>
                    <p>
                      <span>
                        세상은&nbsp;
                        <span className="light">재미있는 이야기들</span>로 채워져 나갈 수 있다고 믿습니다.
                      </span>
                    </p>
                    <p>
                      <span>
                        <span className="light">상상만 해도 얼마나 즐거운 일인가요!</span>
                      </span>
                    </p>
                  </div>
                  <div className="text-box mo ani">
                    <p>
                      <span>
                        띵띵땡은 사람과 사물을 관찰하고 이에 따른&nbsp;
                        <span className="light">스토리</span>
                      </span>
                    </p>
                    <p>
                      <span>
                        <span className="light">디자인</span>을 지향합니다. 이런 과정을 통해서 한개, 한개의
                      </span>
                    </p>
                    <p>
                      <span>프로젝트가 세상에 나올 때마다 조금씩이지만 세상은</span>
                    </p>
                    <p>
                      <span>
                        <span className="light">재미있는 이야기들</span>로 채워져 나갈 수 있다고 믿습니다.
                      </span>
                    </p>
                    <p>
                      <span>
                        <span className="light">상상만 해도 얼마나 즐거운 일인가요!</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <NextProject title="View" />
        <Footer />
      </div>
    </div>
  );
};

export default About;

import { useState } from "react";
import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";
import { withTranslation } from "react-i18next";

import { ContentBlockProps } from "./types";
import { Button } from "../../common/Button";
import { SvgIcon } from "../../common/SvgIcon";
import {
  ContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
  StyledRow,
  ButtonWrapper,
  GalleryImages, // Import the new styled component
  ArrowButton, // Import the new styled component for arrows
} from "./styles";

const ContentBlock = ({
  icon,
  title,
  content,
  section,
  gallery,
  button,
  t,
  id,
  direction,
}: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  // State to keep track of the current image index for each section and gallery
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    section ? section.map(() => 0) : []
  );
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const handlePrevClick = (index: number) => {
    setCurrentImageIndexes((prevIndexes) =>
      prevIndexes.map((currentIndex, i) =>
        i === index
          ? currentIndex === 0
            ? section![i].gallery.length - 1
            : currentIndex - 1
          : currentIndex
      )
    );
  };

  const handleNextClick = (index: number) => {
    setCurrentImageIndexes((prevIndexes) =>
      prevIndexes.map((currentIndex, i) =>
        i === index
          ? currentIndex === section![i].gallery.length - 1
            ? 0
            : currentIndex + 1
          : currentIndex
      )
    );
  };

  const handleGalleryPrevClick = () => {
    setCurrentGalleryIndex((prevIndex) =>
      prevIndex === 0 ? gallery!.length - 1 : prevIndex - 1
    );
  };

  const handleGalleryNextClick = () => {
    setCurrentGalleryIndex((prevIndex) =>
      prevIndex === gallery!.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <ContentSection>
      <Fade direction={direction} triggerOnce>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              {direction === "right" ? (
                <ButtonWrapper>
                  {typeof button === "object" &&
                    button.map(
                      (
                        item: {
                          color?: string;
                          title: string;
                        },
                        id: number
                      ) => {
                        return (
                          <Button
                            key={id}
                            color={item.color}
                            onClick={() => scrollTo("about")}
                          >
                            {t(item.title)}
                          </Button>
                        );
                      }
                    )}
                </ButtonWrapper>
              ) : (
                <>
                  {gallery && gallery.length > 0 && (
                    <GalleryImages>
                      <img src={gallery[currentGalleryIndex]} alt={title} />
                      <ArrowButton onClick={handleGalleryPrevClick}>{"<"}</ArrowButton>
                      <ArrowButton onClick={handleGalleryNextClick}>{">"}</ArrowButton>
                    </GalleryImages>
                  )}
                  <ServiceWrapper>
                    <Row justify="space-between">
                      {typeof section === "object" &&
                        section.map(
                          (
                            item: {
                              title: string;
                              content: string;
                              icon: string;
                              gallery: string[];
                            },
                            index: number
                          ) => {
                            return (
                              <Col key={index} span={11}>
                                <MinTitle>{t(item.title)}</MinTitle>
                                <MinPara>{t(item.content)}</MinPara>
                                <GalleryImages>
                                  {item.gallery.length > 0 && (
                                    <>
                                      <img
                                        src={item.gallery[currentImageIndexes[index]]}
                                        alt={item.title}
                                      />
                                      <ArrowButton onClick={() => handlePrevClick(index)}>
                                        {"<"}
                                      </ArrowButton>
                                      <ArrowButton onClick={() => handleNextClick(index)}>
                                        {">"}
                                      </ArrowButton>
                                    </>
                                  )}
                                </GalleryImages>
                              </Col>
                            );
                          }
                        )}
                    </Row>
                  </ServiceWrapper>
                </>
              )}
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default withTranslation()(ContentBlock);
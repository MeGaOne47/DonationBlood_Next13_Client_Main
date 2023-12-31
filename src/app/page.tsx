/* eslint-disable @next/next/no-img-element */
"use client"
import { Carousel, Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Container style={{ backgroundColor: "#87CEEB", padding: "20px", borderRadius: "10px" }}>
      <Row>
        <Col style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h1 style={{ textAlign: "center" }}>Quyền lợi của người hiến máu</h1>
          <p>Người hiến máu tình nguyện sẽ được những quyền lợi sau:</p>
        </Col>
        <Col>
          <Carousel style={{ maxWidth: "600px", margin: "0 auto" }} data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block w-200"
                src="https://via.placeholder.com/600x450"
                alt="First slide"
                style={{ borderRadius: "8px" }}
              />
              <Carousel.Caption style={{ textAlign: "left", background: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "8px" }}>
                <h5 style={{ color: "#ffffff" }}>Được cấp Giấy chứng nhận hiến máu tình nguyện</h5>
                <ul style={{ color: "#ffffff", listStyleType: "none" }}>
                  <li>1. Giấy chứng nhận được trao cho người hiến máu sau mỗi lần hiến máu tình nguyện.</li>
                  <li>2. Có giá trị để được truyền máu miễn phí bằng số lượng máu đã hiến, khi bản thân người hiến có nhu cầu sử dụng máu tại tất cả các cơ sở y tế công lập trên toàn quốc.</li>
                  <li>3. Người hiến máu cần xuất trình Giấy chứng nhận để làm cơ sở cho các cơ sở y tế thực hiện việc truyền máu miễn phí.</li>
                  <li>4. Cơ sở y tế có trách nhiệm ký, đóng dấu, xác nhận số lượng máu đã truyền miễn phí cho người hiến máu vào giấy chứng nhận.</li>
                </ul>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-200"
                src="https://via.placeholder.com/600x450"
                alt="Second slide"
                style={{ borderRadius: "8px" }}
              />
              <Carousel.Caption style={{ textAlign: "left", background: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "8px" }}>
                <h5 style={{ color: "#ffffff" }}>Được tư vấn về sức khoẻ</h5>
                <ul style={{ color: "#ffffff", listStyleType: "none" }}>
                  <li>- Được giải thích về quy trình hiến máu và các tai biến có thể xảy ra trong và sau khi hiến máu.</li>
                  <li>- Được cung cấp thông tin về dấu hiệu, triệu chứng do nhiễm vi rút viêm gan, HIV và một số bệnh lây qua đường truyền máu, tình dục khác.</li>
                  <li>- Được xét nghiệm sàng lọc một số vi rút lây qua đường truyền máu, tình dục (HIV, Giang mai, viêm gan,…) sau khi hiến máu.</li>
                  <li>- Được bảo mật về kết quả khám lâm sàng, kết quả xét nghiệm.</li>
                </ul>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-200"
                src="https://via.placeholder.com/600x450"
                alt="Third slide"
                style={{ borderRadius: "8px" }}
              />
              <Carousel.Caption style={{ textAlign: "left", background: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "8px" }}>
                <h5 style={{ color: "#ffffff" }}>Được cấp Giấy chứng nhận hiến máu tình nguyện</h5>
                <ul style={{ color: "#ffffff", listStyleType: "none" }}>
                  <li>1. Giấy chứng nhận được trao cho người hiến máu sau mỗi lần hiến máu tình nguyện.</li>
                  <li>2. Có giá trị để được truyền máu miễn phí bằng số lượng máu đã hiến, khi bản thân người hiến có nhu cầu sử dụng máu tại tất cả các cơ sở y tế công lập trên toàn quốc.</li>
                  <li>3. Người hiến máu cần xuất trình Giấy chứng nhận để làm cơ sở cho các cơ sở y tế thực hiện việc truyền máu miễn phí.</li>
                  <li>4. Cơ sở y tế có trách nhiệm ký, đóng dấu, xác nhận số lượng máu đã truyền miễn phí cho người hiến máu vào giấy chứng nhận.</li>
                </ul>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-200"
                src="https://via.placeholder.com/600x450"
                alt="Third slide"
                style={{ borderRadius: "8px" }}
              />
              <Carousel.Caption style={{ textAlign: "left", background: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "8px" }}>
                <h5 style={{ color: "#ffffff" }}>Được tư vấn về sức khoẻ</h5>
                <ul style={{ color: "#ffffff", listStyleType: "none" }}>
                  <li>- Được giải thích về quy trình hiến máu và các tai biến có thể xảy ra trong và sau khi hiến máu.</li>
                  <li>- Được cung cấp thông tin về dấu hiệu, triệu chứng do nhiễm vi rút viêm gan, HIV và một số bệnh lây qua đường truyền máu, tình dục khác.</li>
                  <li>- Được xét nghiệm sàng lọc một số vi rút lây qua đường truyền máu, tình dục (HIV, Giang mai, viêm gan,…) sau khi hiến máu.</li>
                  <li>- Được tư vấn hướng dẫn cách chăm sóc sức khỏe, tư vấn về kết quả bất thường sau hiến máu.</li>
                </ul>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-200"
                src="https://via.placeholder.com/600x450"
                alt="Third slide"
                style={{ borderRadius: "8px" }}
              />
              <Carousel.Caption style={{ textAlign: "left", background: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "8px" }}>
                <h5 style={{ color: "#ffffff" }}>Được bồi dưỡng trực tiếp</h5>
                <ul style={{ color: "#ffffff", listStyleType: "none" }}>
                  <li>- Ăn nhẹ, nước uống tại chỗ: tương đương 30.000 đồng (1 chai trà xanh không độ, 01 hộp chocopie 66gram, 01 hộp bánh Goute 35,5gram).</li>
                  <li>- Hỗ trợ chi phí đi lại (bằng tiền mặt): 50.000 đồng.</li>
                  <li>- Nhận phần quà tặng giá trị tương đương:</li>
                  <ol>
                    <li>100.000đ khi hiến máu 250ml</li>
                    <li>150.000đ khi hiến máu 350ml</li>
                    <li>180.000đ khi hiến máu 450ml</li>
                  </ol>
                </ul>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

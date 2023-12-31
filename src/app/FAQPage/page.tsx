"use client"
// pages/faq.tsx
import React from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';

const FAQPage: React.FC = () => {
  return (
    <Container>
      <h1>Hỏi Đáp Về Hiến Máu</h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>1. Ai có thể tham gia hiến máu?</Accordion.Header>
          <Accordion.Body>
            Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của mình để cứu chữa người bệnh.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>2. Ai là người không nên hiến máu</Accordion.Header>
          <Accordion.Body>
            Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV, viêm gan B, viêm gan C, và các vius lây qua đường truyền máu.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>3. Máu của tôi sẽ được làm những xét nghiệm gì?</Accordion.Header>
          <Accordion.Body>
            Tất cả những đơn vị máu thu được sẽ được kiểm tra nhóm máu (hệ ABO, hệ Rh), HIV, virus viêm gan B, virus viêm gan C, giang mai, sốt rét.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>4. Máu gồm những thành phần và chức năng gì?</Accordion.Header>
          <Accordion.Body>
            <p>
              Máu là một chất lỏng lưu thông trong các mạch máu của cơ thể, gồm nhiều thành phần, mỗi thành phần làm nhiệm vụ khác nhau:
            </p>
            <p>
              - Hồng cầu làm nhiệm vụ chính là vận chuyển oxy.
            </p>
            <p>
              - Bạch cầu làm nhiệm vụ bảo vệ cơ thể.
            </p>
            <p>
              - Tiểu cầu tham gia vào quá trình đông cầm máu.
            </p>
            <p>
              - Huyết tương: gồm nhiều thành phần khác nhau như kháng thể, các yếu tố đông máu, các chất dinh dưỡng...
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>5. Tại sao lại có nhiều người cần phải được truyền máu?</Accordion.Header>
          <Accordion.Body>
            <p>
              Mỗi giờ có hàng trăm người bệnh cần phải được truyền máu vì:
            </p>
            <p>
              - Bị mất máu do chấn thương, tai nạn, thảm hoạ, xuất huyết tiêu hoá...
            </p>
            <p>
              - Do bị các bệnh gây thiếu máu, chảy máu: ung thư máu, suy tuỷ xương, máu khó đông...
            </p>
            <p>
              - Các phương pháp điều trị hiện đại cần truyền nhiều máu: phẫu thuật tim mạch, ghép tạng...
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
            <Accordion.Header>6. Nhu cầu máu điều trị ở nước ta hiện nay?</Accordion.Header>
            <Accordion.Body>
                <p>
                - Mỗi năm nước ta cần khoảng 1.800.000 đơn vị máu điều trị.
                </p>
                <p>
                - Máu cần cho điều trị hằng ngày, cho cấp cứu, cho dự phòng các thảm họa, tai nạn cần truyền máu với số lượng lớn.
                </p>
                <p>
                - Hiện tại chúng ta đã đáp ứng được khoảng 54% nhu cầu máu cho điều trị.
                </p>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
            <Accordion.Header>7. Tại sao khi tham gia hiến máu lại cần phải có giấy CMND?</Accordion.Header>
            <Accordion.Body>
                <p>
                Mỗi đơn vị máu đều phải có hồ sơ, trong đó có các thông tin về người hiến máu. Theo quy định, đây là một thủ tục cần thiết trong quy trình hiến máu để đảm bảo tính xác thực thông tin về người hiến máu.
                </p>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
            <Accordion.Header>8. Hiến máu nhân đạo có hại đến sức khoẻ không?</Accordion.Header>
            <Accordion.Body>
                <p>
                Hiến máu theo hướng dẫn của thầy thuốc không có hại cho sức khỏe. Điều đó đã được chứng minh bằng các cơ sở khoa học và cơ sở thực tế:
                </p>
                <p>
                - Máu có nhiều thành phần, mỗi thành phần chỉ có đời sống nhất định và luôn luôn được đổi mới hằng ngày. Ví dụ: Hồng cầu sống được 120 ngày, huyết tương thường xuyên được thay thế và đổi mới.
                </p>
                <p>
                - Nhiều công trình nghiên cứu đã chứng minh rằng, sau khi hiến máu, các chỉ số máu có thay đổi chút ít nhưng vẫn nằm trong giới hạn sinh lý bình thường không hề gây ảnh hưởng đến các hoạt động thường ngày của cơ thể.
                </p>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
            <Accordion.Header>9. Quyền lợi đối với người hiến máu tình nguyện?</Accordion.Header>
            <Accordion.Body>
                <p>
                Quyền lợi và chế độ đối với người hiến máu tình nguyện theo Thông tư số 05/2017/TT-BYT Quy định giá tối đa và chi phí phục vụ cho việc xác định giá một đơn vị máu toàn phần, chế phẩm máu đạt tiêu chuẩn:
                </p>
                {/* Thêm nội dung cho các quyền lợi */}
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="9">
            <Accordion.Header>10. Khi hiến máu có thể bị nhiễm bệnh không?</Accordion.Header>
            <Accordion.Body>
                <p>
                Kim dây lấy máu vô trùng, chỉ sử dụng một lần cho một người, vì vậy không thể lây bệnh cho người hiến máu.
                </p>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="10">
            <Accordion.Header>11. Ngày mai tôi sẽ hiến máu, tôi nên chuẩn bị như thế nào?</Accordion.Header>
            <Accordion.Body>
                <p>
                - Tối nay bạn không nên thức quá khuya (ngủ trước 23:00).
                </p>
                <p>
                - Nên ăn và không uống rượu, bia trước khi hiến máu.
                </p>
                <p>
                - Mang giấy CMND, đủ giấy tờ tùy thân và thẻ hiến máu(nếu có) khi đi hiến máu.
                </p>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="11">
            <Accordion.Header>12. Những trường hợp nào cần phải trì hoãn hiến máu?</Accordion.Header>
            <Accordion.Body>
                <p>
                - Những người phải trì hoãn hiến máu trong 12 tháng kể từ thời điểm:
                </p>
                <ul>
                <li>Phục hồi hoàn toàn sau các can thiệp ngoại khoa.</li>
                <li>Khỏi bệnh sau khi mắc một trong các bệnh sốt rét, giang mai, lao, uốn ván, viêm não, viêm màng não.</li>
                <li>Kết thúc đợt tiêm vắc xin phòng bệnh dại sau khi bị động vật cắn hoặc tiêm, truyền máu, chế phẩm máu và các chế phẩm sinh học nguồn gốc từ máu.</li>
                <li>Sinh con hoặc chấm dứt thai nghén.</li>
                </ul>
                <p>
                - Những người phải trì hoãn hiến máu trong 06 tháng kể từ thời điểm:
                </p>
                <ul>
                <li>Xăm trổ trên da.</li>
                <li>Bấm dái tai, bấm mũi, bấm rốn hoặc các vị trí khác của cơ thể.</li>
                <li>Phơi nhiễm với máu và dịch cơ thể từ người có nguy cơ hoặc đã nhiễm các bệnh lây truyền qua đường máu.</li>
                <li>Khỏi bệnh sau khi mắc một trong các bệnh thương hàn, nhiễm trùng huyết, bị rắn cắn, viêm tắc động mạch, viêm tắc tĩnh mạch, viêm tuỷ xương, viêm tụy.</li>
                </ul>
                <p>
                - Những người phải trì hoãn hiến máu trong 04 tuần kể từ thời điểm:
                </p>
                <ul>
                <li>Khỏi bệnh sau khi mắc một trong các bệnh viêm dạ dày ruột, viêm đường tiết niệu, viêm da nhiễm trùng, viêm phế quản, viêm phổi, sởi, ho gà, quai bị, sốt xuất huyết, kiết lỵ, rubella, tả, quai bị, thủy đậu, BCG.</li>
                <li>Kết thúc đợt tiêm vắc xin phòng rubella, sởi, thương hàn, tả, quai bị, thủy đậu, BCG.</li>
                </ul>
                <p>
                - Những người phải trì hoãn hiến máu trong 07 ngày kể từ thời điểm:
                </p>
                <ul>
                <li>Khỏi bệnh sau khi mắc một trong các bệnh cúm, cảm lạnh, dị ứng mũi họng, viêm họng, đau nửa đầu Migraine.</li>
                <li>Tiêm các loại vắc xin, trừ các loại đã được quy định tại Điểm c Khoản 1 và Điểm b Khoản 3 Điều này.</li>
                </ul>
                <p>
                - Một số quy định liên quan đến nghề nghiệp và hoạt động đặc thù của người hiến máu: những người làm một số công việc và thực hiện các hoạt động đặc thù sau đây chỉ hiến máu trong ngày nghỉ hoặc chỉ được thực hiện các công việc, hoạt động này sau khi hiến máu tối thiểu 12 giờ:
                </p>
                <ul>
                <li>Người làm việc trên cao hoặc dưới độ sâu: phi công, lái cần cẩu, công nhân làm việc trên cao, người leo núi, thợ mỏ, thủy thủ, thợ lặn.</li>
                <li>Người vận hành các phương tiện giao thông công cộng: lái xe buýt, lái tàu hoả, lái tàu thuỷ.</li>
                <li>Các trường hợp khác: vận động viên chuyên nghiệp, người vận động nặng, tập luyện nặng.</li>
                </ul>  
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="12">
            <Accordion.Header>13. Tôi có thể hiến máu sau khi tiêm vắc xin Covid-19 không?</Accordion.Header>
            <Accordion.Body>
                <p>
                Khi tiêm vắc xin ngừa Covid-19, có thể tham gia hiến máu sau: 7 NGÀY, đề đảm bảo bạn không bị tác dụng phụ và đảm bảo đủ sức khỏe vào ngày hiến máu.
                </p>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="13">
            <Accordion.Header>14. Tôi bị nhiễm Covid-19. Tôi có thể hiến máu sau khi hồi phục không?</Accordion.Header>
            <Accordion.Body>
                <p>
                Khi mắc bệnh Covid-19, có thể tham gia hiến máu sau: 14 ngày kể từ thời điểm có kết quả khẳng định (âm tính) của bài xét nghiệm PCR.
                </p>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="14">
            <Accordion.Header>15. Cách nhận biết người hiến máu tình nguyện?</Accordion.Header>
            <Accordion.Body>
                <p>
                - Người hiến máu tình nguyện không được nhận bất kỳ lợi ích vật chất nào từ việc hiến máu.
                </p>
                <p>
                - Người hiến máu tình nguyện không được bán máu.
                </p>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="15">
            <Accordion.Header>16. Đối với phụ nữ hiến máu có quy định gì?</Accordion.Header>
            <Accordion.Body>
                <p>
                - Phụ nữ không mang thai hoặc đang cho con bú có thể hiến máu.
                </p>
                <p>
                - Phụ nữ mang thai hoặc đang cho con bú không nên hiến máu.
                </p>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="16">
            <Accordion.Header>17. Sau khi hiến máu, tôi cần chú ý gì?</Accordion.Header>
            <Accordion.Body>
                <p>
                - Ăn uống đủ chất dinh dưỡng, nghỉ ngơi đủ giấc sau khi hiến máu.
                </p>
                <p>
                - Tránh hoạt động nặng và uống đủ nước.
                </p>
            </Accordion.Body>
            </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQPage;


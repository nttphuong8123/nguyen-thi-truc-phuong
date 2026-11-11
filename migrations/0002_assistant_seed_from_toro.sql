-- =========================================================================
-- MIGRATION 0002: NẠP DỮ LIỆU TRI THỨC QUY CHẾ HỌC VỤ CHUẨN TỪ DỰ ÁN TORO
-- =========================================================================

INSERT INTO documents (id, title, code, category, issuing_body, issued_date, effective_date, is_effective, status, source_type, file_name, total_chunks) VALUES (
  1, 'Quy chế đào tạo theo phương thức tín chỉ', '624/QĐ-CĐKT', 'quy-che-dao-tao', 'Trường Cao đẳng Kinh tế TP.HCM', '2022-08-09', '2022-08-09', 1, 'approved', 'system', 'QD_624_Quy_che_dao_tao_tin_chi_HCE.pdf', 8
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  101, 1, 1, 'Chương IV: Đánh giá kết quả học tập', 'Điều 13', 'Khoản 1', 14, 'Cách tính điểm môn học và tỷ lệ điểm quá trình - thi kết thúc', 'Điểm môn học được tính theo công thức: Điểm môn học = (Điểm trung bình các điểm kiểm tra x 0,4) + (Điểm thi kết thúc môn học x 0,6). Tỷ lệ cấu thành điểm: 40% điểm quá trình + 60% điểm thi kết thúc môn học.
- Điểm trung bình kiểm tra: Các bài kiểm tra thường xuyên tính hệ số 1, bài kiểm tra định kỳ tính hệ số 2.
- Tất cả điểm thành phần được chấm theo thang điểm 10 (từ 0 đến 10), làm tròn đến một chữ số thập phân.', 'tính điểm môn học, tỷ lệ điểm, điểm quá trình, 40%, 60%, thi kết thúc, hệ số kiểm tra', 417
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  101, 1, 'Quy chế đào tạo theo phương thức tín chỉ', 'Điều 13', 'Cách tính điểm môn học và tỷ lệ điểm quá trình - thi kết thúc', 'Điểm môn học được tính theo công thức: Điểm môn học = (Điểm trung bình các điểm kiểm tra x 0,4) + (Điểm thi kết thúc môn học x 0,6). Tỷ lệ cấu thành điểm: 40% điểm quá trình + 60% điểm thi kết thúc môn học.
- Điểm trung bình kiểm tra: Các bài kiểm tra thường xuyên tính hệ số 1, bài kiểm tra định kỳ tính hệ số 2.
- Tất cả điểm thành phần được chấm theo thang điểm 10 (từ 0 đến 10), làm tròn đến một chữ số thập phân.', 'tính điểm môn học, tỷ lệ điểm, điểm quá trình, 40%, 60%, thi kết thúc, hệ số kiểm tra'
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  102, 1, 2, 'Chương IV: Đánh giá kết quả học tập', 'Điều 13', 'Khoản 2', 15, 'Quy đổi thang điểm 10 sang thang điểm 4 và điểm chữ', 'Quy đổi thang điểm 10 sang thang điểm 4 và điểm chữ theo quy định:
1. Loại ĐẠT:
- Điểm A (8,5 – 10): Điểm 4,00 – Xếp loại Giỏi
- Điểm B (7,0 – 8,4): Điểm 3,00 – Xếp loại Khá
- Điểm C (5,5 – 6,9): Điểm 2,00 – Xếp loại Trung bình
- Điểm D (4,0 – 5,4): Điểm 1,00 – Xếp loại Trung bình yếu
2. Loại KHÔNG ĐẠT:
- Điểm F (Dưới 4,0): Điểm 0,00 – Xếp loại Kém (Bắt buộc phải học lại).
3. Các ký hiệu điểm đặc biệt:
- Điểm I: Chưa đủ dữ liệu đánh giá (cho phép nợ điểm kiểm tra bộ phận hoặc thi vì lý do bất khả kháng, ốm đau/tai nạn có giấy xác nhận của bệnh viện).
- Điểm X: Chưa nhận được kết quả thi.
- Điểm R: Được chuyển điểm (môn học được thi sớm để học vượt hoặc công nhận kết quả khi chuyển trường).', 'thang điểm 4, điểm chữ, điểm A, điểm B, điểm C, điểm D, điểm F, nợ điểm I, điểm X, chuyển điểm R, học lại', 698
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  102, 1, 'Quy chế đào tạo theo phương thức tín chỉ', 'Điều 13', 'Quy đổi thang điểm 10 sang thang điểm 4 và điểm chữ', 'Quy đổi thang điểm 10 sang thang điểm 4 và điểm chữ theo quy định:
1. Loại ĐẠT:
- Điểm A (8,5 – 10): Điểm 4,00 – Xếp loại Giỏi
- Điểm B (7,0 – 8,4): Điểm 3,00 – Xếp loại Khá
- Điểm C (5,5 – 6,9): Điểm 2,00 – Xếp loại Trung bình
- Điểm D (4,0 – 5,4): Điểm 1,00 – Xếp loại Trung bình yếu
2. Loại KHÔNG ĐẠT:
- Điểm F (Dưới 4,0): Điểm 0,00 – Xếp loại Kém (Bắt buộc phải học lại).
3. Các ký hiệu điểm đặc biệt:
- Điểm I: Chưa đủ dữ liệu đánh giá (cho phép nợ điểm kiểm tra bộ phận hoặc thi vì lý do bất khả kháng, ốm đau/tai nạn có giấy xác nhận của bệnh viện).
- Điểm X: Chưa nhận được kết quả thi.
- Điểm R: Được chuyển điểm (môn học được thi sớm để học vượt hoặc công nhận kết quả khi chuyển trường).', 'thang điểm 4, điểm chữ, điểm A, điểm B, điểm C, điểm D, điểm F, nợ điểm I, điểm X, chuyển điểm R, học lại'
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  103, 1, 3, 'Chương IV: Đánh giá kết quả học tập', 'Điều 12', 'Khoản 1', 12, 'Điều kiện dự thi kết thúc môn học và cảnh báo cấm thi', 'Sinh viên phải thỏa mãn đầy đủ các điều kiện sau mới được dự thi kết thúc môn học:
1. Chuyên cần: Tham dự ít nhất 80% thời gian học tập trên lớp của môn học/học phần (lý thuyết, tích hợp, thực hành, thực tập). TUYỆT ĐỐI KHÔNG ĐƯỢC VẮNG QUÁ 20% tổng số tiết quy định (dù có phép hay không phép).
2. Điểm kiểm tra quá trình: ĐIỂM TRUNG BÌNH CHUNG CÁC ĐIỂM KIỂM TRA PHẢI ĐẠT TỪ 5,0 ĐIỂM TRỞ LÊN theo thang điểm 10. Nếu điểm trung bình kiểm tra < 5,0 điểm thì KHÔNG ĐỦ ĐIỀU KIỆN DỰ THI.
3. Còn số lần dự thi theo quy định (tối đa 2 lần).
4. Hoàn thành nghĩa vụ học phí của học kỳ và môn học theo đúng thời hạn thông báo của trường.
5. Cảnh báo CẤM THI: Sinh viên vi phạm một trong các điều kiện trên (vắng quá 20% tiết, điểm TB kiểm tra < 5,0, nợ học phí, bị kỷ luật...) sẽ bị đưa vào DANH SÁCH CẤM THI, nhận điểm 0 (F) môn học đó và bắt buộc phải đăng ký học lại từ đầu.', 'điều kiện dự thi, cấm thi, vắng quá 20%, điểm quá trình dưới 5, chuyên cần, nợ học phí', 867
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  103, 1, 'Quy chế đào tạo theo phương thức tín chỉ', 'Điều 12', 'Điều kiện dự thi kết thúc môn học và cảnh báo cấm thi', 'Sinh viên phải thỏa mãn đầy đủ các điều kiện sau mới được dự thi kết thúc môn học:
1. Chuyên cần: Tham dự ít nhất 80% thời gian học tập trên lớp của môn học/học phần (lý thuyết, tích hợp, thực hành, thực tập). TUYỆT ĐỐI KHÔNG ĐƯỢC VẮNG QUÁ 20% tổng số tiết quy định (dù có phép hay không phép).
2. Điểm kiểm tra quá trình: ĐIỂM TRUNG BÌNH CHUNG CÁC ĐIỂM KIỂM TRA PHẢI ĐẠT TỪ 5,0 ĐIỂM TRỞ LÊN theo thang điểm 10. Nếu điểm trung bình kiểm tra < 5,0 điểm thì KHÔNG ĐỦ ĐIỀU KIỆN DỰ THI.
3. Còn số lần dự thi theo quy định (tối đa 2 lần).
4. Hoàn thành nghĩa vụ học phí của học kỳ và môn học theo đúng thời hạn thông báo của trường.
5. Cảnh báo CẤM THI: Sinh viên vi phạm một trong các điều kiện trên (vắng quá 20% tiết, điểm TB kiểm tra < 5,0, nợ học phí, bị kỷ luật...) sẽ bị đưa vào DANH SÁCH CẤM THI, nhận điểm 0 (F) môn học đó và bắt buộc phải đăng ký học lại từ đầu.', 'điều kiện dự thi, cấm thi, vắng quá 20%, điểm quá trình dưới 5, chuyên cần, nợ học phí'
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  104, 1, 4, 'Chương IV: Đánh giá kết quả học tập', 'Điều 12', 'Khoản 2 & Khoản 3', 13, 'Quy định số lần dự thi, thi lại và thi cải thiện điểm', '1. Số lần dự thi: Trong một học kỳ, mỗi môn học sinh viên được dự thi TỐI ĐA 02 (HAI) LẦN.
2. Thi lại (lần 2): Sinh viên phải dự thi lần 2 nếu: (a) Điểm thi lần 1 chưa đạt yêu cầu (< 2,0 điểm, thang 10); hoặc (b) Điểm tổng kết môn học không đạt (< 4,0 điểm, thang 10).
3. Thi cải thiện điểm: Sinh viên có điểm thi lần 1 đạt yêu cầu nhưng muốn nâng điểm thì được đăng ký thi thêm 01 lần để cải thiện điểm số (không được bảo lưu điểm thi trước đó; điểm thi cải thiện không được tính để xét học bổng khuyến khích).
4. Vắng thi: Vắng thi không có lý do chính đáng bị tính 1 lần dự thi và nhận điểm 0. Hoãn thi (có lý do chính đáng kèm đơn và minh chứng gửi trong vòng 03 ngày làm việc) được dự thi lần 2 mà không bị coi là thi lại.', 'thi lại, số lần thi, thi lần 2, thi cải thiện điểm, hoãn thi, vắng thi', 727
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  104, 1, 'Quy chế đào tạo theo phương thức tín chỉ', 'Điều 12', 'Quy định số lần dự thi, thi lại và thi cải thiện điểm', '1. Số lần dự thi: Trong một học kỳ, mỗi môn học sinh viên được dự thi TỐI ĐA 02 (HAI) LẦN.
2. Thi lại (lần 2): Sinh viên phải dự thi lần 2 nếu: (a) Điểm thi lần 1 chưa đạt yêu cầu (< 2,0 điểm, thang 10); hoặc (b) Điểm tổng kết môn học không đạt (< 4,0 điểm, thang 10).
3. Thi cải thiện điểm: Sinh viên có điểm thi lần 1 đạt yêu cầu nhưng muốn nâng điểm thì được đăng ký thi thêm 01 lần để cải thiện điểm số (không được bảo lưu điểm thi trước đó; điểm thi cải thiện không được tính để xét học bổng khuyến khích).
4. Vắng thi: Vắng thi không có lý do chính đáng bị tính 1 lần dự thi và nhận điểm 0. Hoãn thi (có lý do chính đáng kèm đơn và minh chứng gửi trong vòng 03 ngày làm việc) được dự thi lần 2 mà không bị coi là thi lại.', 'thi lại, số lần thi, thi lần 2, thi cải thiện điểm, hoãn thi, vắng thi'
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  105, 1, 5, 'Chương V: Học lại và rút bớt học phần', 'Điều 18 & Điều 19', 'Toàn văn', 18, 'Quy định học lại môn học và rút bớt học phần đã đăng ký', '1. Học lại:
- Sinh viên bắt buộc phải đăng ký học lại môn học nếu: Bị cấm thi, vắng thi không lý do ở lần 2, hoặc sau 2 lần thi vẫn có điểm môn học bị F (dưới 4,0).
- Điểm của môn học học lại sẽ thay thế điểm F trước đó khi tính điểm trung bình chung tích lũy.
2. Rút bớt học phần:
- Thời hạn: Sau 1 tuần nhưng không muộn quá 2 tuần kể từ đầu học kỳ chính; hoặc không muộn quá 1 tuần kể từ khi bắt đầu học kỳ phụ.
- Điều kiện: Làm phiếu đề nghị theo mẫu gửi Phòng Đào tạo, được Cố vấn học tập chấp thuận; khối lượng môn học còn lại không nhỏ hơn 2/3 khối lượng trung bình học kỳ. Học phần rút hợp lệ không bị ghi điểm F.', 'học lại môn học, rút học phần, hủy môn, thời hạn rút môn, điểm F', 620
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  105, 1, 'Quy chế đào tạo theo phương thức tín chỉ', 'Điều 18 & Điều 19', 'Quy định học lại môn học và rút bớt học phần đã đăng ký', '1. Học lại:
- Sinh viên bắt buộc phải đăng ký học lại môn học nếu: Bị cấm thi, vắng thi không lý do ở lần 2, hoặc sau 2 lần thi vẫn có điểm môn học bị F (dưới 4,0).
- Điểm của môn học học lại sẽ thay thế điểm F trước đó khi tính điểm trung bình chung tích lũy.
2. Rút bớt học phần:
- Thời hạn: Sau 1 tuần nhưng không muộn quá 2 tuần kể từ đầu học kỳ chính; hoặc không muộn quá 1 tuần kể từ khi bắt đầu học kỳ phụ.
- Điều kiện: Làm phiếu đề nghị theo mẫu gửi Phòng Đào tạo, được Cố vấn học tập chấp thuận; khối lượng môn học còn lại không nhỏ hơn 2/3 khối lượng trung bình học kỳ. Học phần rút hợp lệ không bị ghi điểm F.', 'học lại môn học, rút học phần, hủy môn, thời hạn rút môn, điểm F'
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  106, 1, 6, 'Chương III: Quá trình đào tạo', 'Điều 8', 'Toàn văn', 9, 'Quy định tạm dừng chương trình, bảo lưu kết quả học tập và tạm hoãn', '1. Bảo lưu kết quả học tập (nghỉ học tạm thời):
- Điều kiện: Phải hoàn thành ít nhất 01 học kỳ tại trường, không bị cảnh báo học tập hoặc xem xét buộc thôi học.
- Thời gian bảo lưu: TỐI ĐA 02 (HAI) NĂM. Thời gian này KHÔNG TÍNH vào thời gian tối đa hoàn thành khóa học. Sinh viên phải có đơn và được Hiệu trưởng phê duyệt.
2. Tạm hoãn môn học (nghỉ học tạm thời vì sức khỏe/lý do đặc biệt): Có minh chứng y tế của cơ sở y tế có thẩm quyền; thời gian này ĐƯỢC TÍNH vào thời gian tối đa hoàn thành chương trình.
3. Tạm hoãn nghĩa vụ quân sự: Nhà trường cấp Giấy xác nhận sinh viên để nộp về Ban Chỉ huy quân sự địa phương theo Luật Nghĩa vụ quân sự.', 'bảo lưu kết quả, tạm dừng học tập, nghỉ học tạm thời, hoãn nghĩa vụ quân sự, thời gian bảo lưu', 647
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  106, 1, 'Quy chế đào tạo theo phương thức tín chỉ', 'Điều 8', 'Quy định tạm dừng chương trình, bảo lưu kết quả học tập và tạm hoãn', '1. Bảo lưu kết quả học tập (nghỉ học tạm thời):
- Điều kiện: Phải hoàn thành ít nhất 01 học kỳ tại trường, không bị cảnh báo học tập hoặc xem xét buộc thôi học.
- Thời gian bảo lưu: TỐI ĐA 02 (HAI) NĂM. Thời gian này KHÔNG TÍNH vào thời gian tối đa hoàn thành khóa học. Sinh viên phải có đơn và được Hiệu trưởng phê duyệt.
2. Tạm hoãn môn học (nghỉ học tạm thời vì sức khỏe/lý do đặc biệt): Có minh chứng y tế của cơ sở y tế có thẩm quyền; thời gian này ĐƯỢC TÍNH vào thời gian tối đa hoàn thành chương trình.
3. Tạm hoãn nghĩa vụ quân sự: Nhà trường cấp Giấy xác nhận sinh viên để nộp về Ban Chỉ huy quân sự địa phương theo Luật Nghĩa vụ quân sự.', 'bảo lưu kết quả, tạm dừng học tập, nghỉ học tạm thời, hoãn nghĩa vụ quân sự, thời gian bảo lưu'
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  107, 1, 7, 'Chương V: Xử lý kết quả học tập', 'Điều 21', 'Toàn văn', 21, 'Quy định cảnh báo kết quả học tập và buộc thôi học', '1. Cảnh báo kết quả học tập:
Sinh viên bị cảnh báo học tập nếu:
- (a) Tổng số môn học không đạt trong học kỳ vượt quá 50% khối lượng học tập đã đăng ký; hoặc
- (b) Điểm trung bình chung học kỳ (ĐTBCHK) dưới 1,2 (đối với học kỳ đầu tiên của khóa học) hoặc dưới 1,5 (đối với các học kỳ tiếp theo).
2. Buộc thôi học:
Sinh viên bị buộc thôi học nếu thuộc một trong các trường hợp:
- (a) Số lần bị cảnh báo kết quả học tập VƯỢT QUÁ 04 LẦN;
- (b) Hết thời gian tối đa để hoàn thành chương trình đào tạo (quá 1,5 lần thời gian thiết kế của khóa học);
- (c) Bị kỷ luật ở mức buộc thôi học theo Quy chế công tác sinh viên.', 'cảnh báo học tập, buộc thôi học, quá 4 lần cảnh báo, điểm trung bình dưới 1.2, điểm dưới 1.5', 613
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  107, 1, 'Quy chế đào tạo theo phương thức tín chỉ', 'Điều 21', 'Quy định cảnh báo kết quả học tập và buộc thôi học', '1. Cảnh báo kết quả học tập:
Sinh viên bị cảnh báo học tập nếu:
- (a) Tổng số môn học không đạt trong học kỳ vượt quá 50% khối lượng học tập đã đăng ký; hoặc
- (b) Điểm trung bình chung học kỳ (ĐTBCHK) dưới 1,2 (đối với học kỳ đầu tiên của khóa học) hoặc dưới 1,5 (đối với các học kỳ tiếp theo).
2. Buộc thôi học:
Sinh viên bị buộc thôi học nếu thuộc một trong các trường hợp:
- (a) Số lần bị cảnh báo kết quả học tập VƯỢT QUÁ 04 LẦN;
- (b) Hết thời gian tối đa để hoàn thành chương trình đào tạo (quá 1,5 lần thời gian thiết kế của khóa học);
- (c) Bị kỷ luật ở mức buộc thôi học theo Quy chế công tác sinh viên.', 'cảnh báo học tập, buộc thôi học, quá 4 lần cảnh báo, điểm trung bình dưới 1.2, điểm dưới 1.5'
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  108, 1, 8, 'Chương VI: Tốt nghiệp và xếp loại', 'Điều 22 & Điều 23', 'Toàn văn', 23, 'Điều kiện xét công nhận tốt nghiệp và quy tắc hạ bậc xếp loại tốt nghiệp', '1. Điều kiện xét công nhận tốt nghiệp:
- Tích lũy đủ số môn học và số tín chỉ quy định trong chương trình đào tạo;
- Điểm trung bình chung tích lũy (ĐTBCTL) toàn khóa đạt từ 2,00 trở lên (theo thang điểm 4);
- Hoàn thành đầy đủ học phần Giáo dục thể chất (GDTC) và Giáo dục quốc phòng - an ninh (GDQP-AN);
- Có chứng nhận hoàn thành khóa đào tạo Kỹ năng mềm;
- Đạt Chuẩn đầu ra Ngoại ngữ và Chuẩn đầu ra Tin học theo quy định của nhà trường;
- Không đang trong thời gian bị truy cứu trách nhiệm hình sự hoặc bị kỷ luật ở mức đình chỉ học tập.
2. Xếp loại tốt nghiệp:
- Xuất sắc: ĐTBCTL từ 3,50 đến 4,00
- Giỏi: ĐTBCTL từ 3,00 đến 3,49
- Khá: ĐTBCTL từ 2,50 đến 2,99
- Trung bình: ĐTBCTL từ 2,00 đến 2,49
3. Quy tắc HẠ 1 MỨC xếp loại tốt nghiệp:
Sinh viên có điểm tốt nghiệp đạt loại Xuất sắc hoặc Giỏi sẽ bị HẠ XUỐNG 1 BẬC nếu:
- Bị kỷ luật từ mức cảnh cáo trở lên trong thời gian học; hoặc
- Khối lượng các học phần phải thi lại vượt quá 5% tổng số tín chỉ của toàn khóa học (đối với loại Xuất sắc), hoặc có từ 2 môn thi lại trở lên (đối với loại Giỏi).', 'điều kiện tốt nghiệp, xếp loại tốt nghiệp, hạ bậc tốt nghiệp, điểm tích lũy 2.0, chuẩn đầu ra', 1054
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  108, 1, 'Quy chế đào tạo theo phương thức tín chỉ', 'Điều 22 & Điều 23', 'Điều kiện xét công nhận tốt nghiệp và quy tắc hạ bậc xếp loại tốt nghiệp', '1. Điều kiện xét công nhận tốt nghiệp:
- Tích lũy đủ số môn học và số tín chỉ quy định trong chương trình đào tạo;
- Điểm trung bình chung tích lũy (ĐTBCTL) toàn khóa đạt từ 2,00 trở lên (theo thang điểm 4);
- Hoàn thành đầy đủ học phần Giáo dục thể chất (GDTC) và Giáo dục quốc phòng - an ninh (GDQP-AN);
- Có chứng nhận hoàn thành khóa đào tạo Kỹ năng mềm;
- Đạt Chuẩn đầu ra Ngoại ngữ và Chuẩn đầu ra Tin học theo quy định của nhà trường;
- Không đang trong thời gian bị truy cứu trách nhiệm hình sự hoặc bị kỷ luật ở mức đình chỉ học tập.
2. Xếp loại tốt nghiệp:
- Xuất sắc: ĐTBCTL từ 3,50 đến 4,00
- Giỏi: ĐTBCTL từ 3,00 đến 3,49
- Khá: ĐTBCTL từ 2,50 đến 2,99
- Trung bình: ĐTBCTL từ 2,00 đến 2,49
3. Quy tắc HẠ 1 MỨC xếp loại tốt nghiệp:
Sinh viên có điểm tốt nghiệp đạt loại Xuất sắc hoặc Giỏi sẽ bị HẠ XUỐNG 1 BẬC nếu:
- Bị kỷ luật từ mức cảnh cáo trở lên trong thời gian học; hoặc
- Khối lượng các học phần phải thi lại vượt quá 5% tổng số tín chỉ của toàn khóa học (đối với loại Xuất sắc), hoặc có từ 2 môn thi lại trở lên (đối với loại Giỏi).', 'điều kiện tốt nghiệp, xếp loại tốt nghiệp, hạ bậc tốt nghiệp, điểm tích lũy 2.0, chuẩn đầu ra'
);

INSERT INTO documents (id, title, code, category, issuing_body, issued_date, effective_date, is_effective, status, source_type, file_name, total_chunks) VALUES (
  2, 'Quy định Chuẩn đầu ra Năng lực Tin học và Ngoại ngữ', '487/QĐ-CĐKT', 'chuan-dau-ra', 'Trường Cao đẳng Kinh tế TP.HCM', '2022-06-15', '2022-06-15', 1, 'approved', 'system', 'QD_487_Chuan_dau_ra_Tin_hoc_Ngoai_ngu_HCE.pdf', 2
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  201, 2, 1, 'Phần I: Chuẩn đầu ra Tin học', 'Điều 1', 'Khoản 1 & 2', 2, 'Chuẩn đầu ra Năng lực Tin học đối với sinh viên cao đẳng chính quy', '1. Yêu cầu bắt buộc: Sinh viên bậc cao đẳng chính quy trước khi xét tốt nghiệp phải đạt Chuẩn đầu ra Năng lực Tin học theo quy định của Trường Cao đẳng Kinh tế TP.HCM (ngành Công nghệ thông tin được miễn).
2. Các chứng chỉ được công nhận:
- Chứng chỉ Ứng dụng Công nghệ thông tin cơ bản (theo Thông tư số 03/2014/TT-BTTTT của Bộ Thông tin và Truyền thông);
- Hoặc các chứng chỉ quốc tế còn hiệu lực: MOS (Microsoft Office Specialist) đạt từ 700/1000 điểm mỗi kỹ năng (Word, Excel), chứng chỉ IC3 GS4/GS5.', 'chuẩn đầu ra tin học, chứng chỉ ứng dụng cntt cơ bản, MOS, IC3, miễn tin học CNTT', 504
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  201, 2, 'Quy định Chuẩn đầu ra Năng lực Tin học và Ngoại ngữ', 'Điều 1', 'Chuẩn đầu ra Năng lực Tin học đối với sinh viên cao đẳng chính quy', '1. Yêu cầu bắt buộc: Sinh viên bậc cao đẳng chính quy trước khi xét tốt nghiệp phải đạt Chuẩn đầu ra Năng lực Tin học theo quy định của Trường Cao đẳng Kinh tế TP.HCM (ngành Công nghệ thông tin được miễn).
2. Các chứng chỉ được công nhận:
- Chứng chỉ Ứng dụng Công nghệ thông tin cơ bản (theo Thông tư số 03/2014/TT-BTTTT của Bộ Thông tin và Truyền thông);
- Hoặc các chứng chỉ quốc tế còn hiệu lực: MOS (Microsoft Office Specialist) đạt từ 700/1000 điểm mỗi kỹ năng (Word, Excel), chứng chỉ IC3 GS4/GS5.', 'chuẩn đầu ra tin học, chứng chỉ ứng dụng cntt cơ bản, MOS, IC3, miễn tin học CNTT'
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  202, 2, 2, 'Phần II: Chuẩn đầu ra Ngoại ngữ', 'Điều 2', 'Khoản 1 & 2', 4, 'Chuẩn đầu ra Năng lực Ngoại ngữ (Tiếng Anh) đối với sinh viên', '1. Yêu cầu bắt buộc: Đạt năng lực Ngoại ngữ bậc 2/6 theo Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam (hoặc tương đương A2/B1 tùy theo ngành đào tạo cụ thể).
2. Quy đổi chứng chỉ quốc tế tương đương:
- Sinh viên có thể nộp các chứng chỉ tiếng Anh quốc tế còn thời hạn 2 năm tính đến thời điểm xét tốt nghiệp: TOEIC (từ 350 - 450 điểm tùy ngành), IELTS (từ 3.5 - 4.5), TOEFL ITP, VSTEP bậc 2 trở lên.
- Hồ sơ công nhận nộp về Phòng Quản lý Đào tạo theo đúng thông báo xét chuẩn đầu ra từng đợt của trường.', 'chuẩn đầu ra ngoại ngữ, tiếng Anh, bậc 2/6, TOEIC, IELTS, VSTEP, quy đổi chứng chỉ', 508
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  202, 2, 'Quy định Chuẩn đầu ra Năng lực Tin học và Ngoại ngữ', 'Điều 2', 'Chuẩn đầu ra Năng lực Ngoại ngữ (Tiếng Anh) đối với sinh viên', '1. Yêu cầu bắt buộc: Đạt năng lực Ngoại ngữ bậc 2/6 theo Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam (hoặc tương đương A2/B1 tùy theo ngành đào tạo cụ thể).
2. Quy đổi chứng chỉ quốc tế tương đương:
- Sinh viên có thể nộp các chứng chỉ tiếng Anh quốc tế còn thời hạn 2 năm tính đến thời điểm xét tốt nghiệp: TOEIC (từ 350 - 450 điểm tùy ngành), IELTS (từ 3.5 - 4.5), TOEFL ITP, VSTEP bậc 2 trở lên.
- Hồ sơ công nhận nộp về Phòng Quản lý Đào tạo theo đúng thông báo xét chuẩn đầu ra từng đợt của trường.', 'chuẩn đầu ra ngoại ngữ, tiếng Anh, bậc 2/6, TOEIC, IELTS, VSTEP, quy đổi chứng chỉ'
);

INSERT INTO documents (id, title, code, category, issuing_body, issued_date, effective_date, is_effective, status, source_type, file_name, total_chunks) VALUES (
  3, 'Quy định Học bổng khuyến khích học tập và Miễn giảm học phí', '120/QĐ-CĐKT & 238/QĐ-CĐKT', 'hoc-bong-hoc-phi', 'Trường Cao đẳng Kinh tế TP.HCM', '2024-08-01', '2024-09-01', 1, 'approved', 'system', 'QD_120_238_Hoc_bong_Mien_giam_hoc_phi_HCE.pdf', 2
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  301, 3, 1, 'Quy định Học bổng KKHT (QĐ 120)', 'Điều 3 & Điều 4', 'Toàn văn', 3, 'Điều kiện xét cấp Học bổng khuyến khích học tập', '1. Đối tượng và điều kiện:
- Sinh viên đang theo học hệ chính quy tại trường có kết quả học tập và rèn luyện từ loại Khá trở lên trong học kỳ xét học bổng.
- Đăng ký đủ số tín chỉ tối thiểu theo quy định của học kỳ (không tính học phần cải thiện hoặc học lại).
- KHÔNG CÓ HỌC PHẦN NÀO BỊ ĐIỂM DƯỚI C (hoặc điểm F).
- Không bị kỷ luật từ mức khiển trách trở lên trong học kỳ xét học bổng.
2. Các mức học bổng:
- Học bổng loại Xuất sắc: ĐTBCHK $ge 3,60$ và Điểm rèn luyện $ge 90$ điểm.
- Học bổng loại Giỏi: ĐTBCHK từ 3,20 đến 3,59 và Điểm rèn luyện $ge 80$ điểm.
- Học bổng loại Khá: ĐTBCHK từ 2,50 đến 3,19 và Điểm rèn luyện $ge 70$ điểm.
- Học bổng được xét và cấp theo thứ tự từ cao xuống thấp cho đến khi hết quỹ học bổng được phê duyệt.', 'học bổng khuyến khích, học bổng xuất sắc, học bổng giỏi, học bổng khá, điều kiện học bổng, điểm rèn luyện', 740
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  301, 3, 'Quy định Học bổng khuyến khích học tập và Miễn giảm học phí', 'Điều 3 & Điều 4', 'Điều kiện xét cấp Học bổng khuyến khích học tập', '1. Đối tượng và điều kiện:
- Sinh viên đang theo học hệ chính quy tại trường có kết quả học tập và rèn luyện từ loại Khá trở lên trong học kỳ xét học bổng.
- Đăng ký đủ số tín chỉ tối thiểu theo quy định của học kỳ (không tính học phần cải thiện hoặc học lại).
- KHÔNG CÓ HỌC PHẦN NÀO BỊ ĐIỂM DƯỚI C (hoặc điểm F).
- Không bị kỷ luật từ mức khiển trách trở lên trong học kỳ xét học bổng.
2. Các mức học bổng:
- Học bổng loại Xuất sắc: ĐTBCHK $ge 3,60$ và Điểm rèn luyện $ge 90$ điểm.
- Học bổng loại Giỏi: ĐTBCHK từ 3,20 đến 3,59 và Điểm rèn luyện $ge 80$ điểm.
- Học bổng loại Khá: ĐTBCHK từ 2,50 đến 3,19 và Điểm rèn luyện $ge 70$ điểm.
- Học bổng được xét và cấp theo thứ tự từ cao xuống thấp cho đến khi hết quỹ học bổng được phê duyệt.', 'học bổng khuyến khích, học bổng xuất sắc, học bổng giỏi, học bổng khá, điều kiện học bổng, điểm rèn luyện'
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  302, 3, 2, 'Quy định Miễn giảm học phí (QĐ 238)', 'Điều 2', 'Toàn văn', 2, 'Chính sách miễn giảm học phí và trợ cấp xã hội cho sinh viên', 'Nhà trường thực hiện chế độ miễn, giảm học phí theo Nghị định số 81/2021/NĐ-CP của Chính phủ và Quy chế của trường:
1. Đối tượng miễn 100% học phí: Con liệt sĩ, con thương binh, sinh viên khuyết tật, sinh viên mồ côi cả cha lẫn mẹ không nơi nương tựa, sinh viên thuộc hộ nghèo/cận nghèo theo quy định.
2. Đối tượng giảm 70% hoặc 50% học phí: Theo danh mục nghề, công việc độc hại hoặc các diện bảo trợ xã hội.
3. Thủ tục hồ sơ: Sinh viên nộp đơn đề nghị và bản sao công chứng các giấy tờ minh chứng về Phòng Công tác Học sinh - Sinh viên vào đầu mỗi học kỳ theo thời hạn thông báo.', 'miễn giảm học phí, trợ cấp xã hội, con thương binh, hộ nghèo, nghị định 81', 581
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  302, 3, 'Quy định Học bổng khuyến khích học tập và Miễn giảm học phí', 'Điều 2', 'Chính sách miễn giảm học phí và trợ cấp xã hội cho sinh viên', 'Nhà trường thực hiện chế độ miễn, giảm học phí theo Nghị định số 81/2021/NĐ-CP của Chính phủ và Quy chế của trường:
1. Đối tượng miễn 100% học phí: Con liệt sĩ, con thương binh, sinh viên khuyết tật, sinh viên mồ côi cả cha lẫn mẹ không nơi nương tựa, sinh viên thuộc hộ nghèo/cận nghèo theo quy định.
2. Đối tượng giảm 70% hoặc 50% học phí: Theo danh mục nghề, công việc độc hại hoặc các diện bảo trợ xã hội.
3. Thủ tục hồ sơ: Sinh viên nộp đơn đề nghị và bản sao công chứng các giấy tờ minh chứng về Phòng Công tác Học sinh - Sinh viên vào đầu mỗi học kỳ theo thời hạn thông báo.', 'miễn giảm học phí, trợ cấp xã hội, con thương binh, hộ nghèo, nghị định 81'
);

INSERT INTO documents (id, title, code, category, issuing_body, issued_date, effective_date, is_effective, status, source_type, file_name, total_chunks) VALUES (
  4, 'Quy định Công tác Học sinh - Sinh viên và Đánh giá Điểm rèn luyện', '1105/QĐ-CĐKT & 1043/QĐ-CĐKT', 'cong-tac-sinh-vien', 'Trường Cao đẳng Kinh tế TP.HCM', '2023-09-01', '2023-09-01', 1, 'approved', 'system', 'QD_1105_1043_Cong_tac_HSSV_Diem_ren_luyen.pdf', 1
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  401, 4, 1, 'Quy chế Đánh giá rèn luyện (QĐ 1105)', 'Điều 5', 'Toàn văn', 5, '5 Tiêu chí đánh giá Điểm rèn luyện sinh viên theo học kỳ', 'Điểm rèn luyện của sinh viên được đánh giá theo thang điểm 100 qua 5 khung tiêu chí:
1. Tiêu chí 1: Đánh giá về ý thức học tập (tối đa 20 điểm).
2. Tiêu chí 2: Đánh giá về ý thức chấp hành nội quy, quy chế, quy định trong nhà trường (tối đa 25 điểm).
3. Tiêu chí 3: Đánh giá về ý thức tham gia các hoạt động rèn luyện chính trị, xã hội, văn hóa, thể thao, phòng chống tội phạm (tối đa 20 điểm).
4. Tiêu chí 4: Đánh giá về phẩm chất công dân và quan hệ với cộng đồng (tối đa 25 điểm).
5. Tiêu chí 5: Đánh giá về ý thức và kết quả khi tham gia công tác phụ trách lớp, đoàn thể, câu lạc bộ hoặc thành tích đặc biệt (tối đa 10 điểm).
- Xếp loại rèn luyện: Xuất sắc (90 - 100 điểm), Tốt (80 - 89 điểm), Khá (65 - 79 điểm), Trung bình (50 - 64 điểm), Yếu (35 - 49 điểm), Kém (Dưới 35 điểm).', 'điểm rèn luyện, 5 tiêu chí rèn luyện, xếp loại rèn luyện, ý thức học tập, chấp hành nội quy', 784
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  401, 4, 'Quy định Công tác Học sinh - Sinh viên và Đánh giá Điểm rèn luyện', 'Điều 5', '5 Tiêu chí đánh giá Điểm rèn luyện sinh viên theo học kỳ', 'Điểm rèn luyện của sinh viên được đánh giá theo thang điểm 100 qua 5 khung tiêu chí:
1. Tiêu chí 1: Đánh giá về ý thức học tập (tối đa 20 điểm).
2. Tiêu chí 2: Đánh giá về ý thức chấp hành nội quy, quy chế, quy định trong nhà trường (tối đa 25 điểm).
3. Tiêu chí 3: Đánh giá về ý thức tham gia các hoạt động rèn luyện chính trị, xã hội, văn hóa, thể thao, phòng chống tội phạm (tối đa 20 điểm).
4. Tiêu chí 4: Đánh giá về phẩm chất công dân và quan hệ với cộng đồng (tối đa 25 điểm).
5. Tiêu chí 5: Đánh giá về ý thức và kết quả khi tham gia công tác phụ trách lớp, đoàn thể, câu lạc bộ hoặc thành tích đặc biệt (tối đa 10 điểm).
- Xếp loại rèn luyện: Xuất sắc (90 - 100 điểm), Tốt (80 - 89 điểm), Khá (65 - 79 điểm), Trung bình (50 - 64 điểm), Yếu (35 - 49 điểm), Kém (Dưới 35 điểm).', 'điểm rèn luyện, 5 tiêu chí rèn luyện, xếp loại rèn luyện, ý thức học tập, chấp hành nội quy'
);

INSERT INTO documents (id, title, code, category, issuing_body, issued_date, effective_date, is_effective, status, source_type, file_name, total_chunks) VALUES (
  5, 'Hướng dẫn Thực tập tốt nghiệp & Xây dựng đề cương báo cáo 3 chương chuẩn Khoa QTKD', 'HD-TTTN-QTKD-HCE', 'thuc-tap', 'Khoa Quản trị - Kinh doanh, Trường Cao đẳng Kinh tế TP.HCM', '2024-01-15', '2024-01-15', 1, 'approved', 'system', 'Huong_dan_Thuc_tap_tot_nghiep_QTKD_HCE.pdf', 2
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  501, 5, 1, 'Phần I: Cấu trúc Tên đề tài & Thời gian nghiên cứu', 'Quy tắc 1 & 2', 'Toàn văn', 2, 'Quy tắc đặt tên đề tài thực tập tốt nghiệp và mốc thời gian nghiên cứu bắt buộc', '1. Cấu trúc bắt buộc của Tên đề tài:
Tên đề tài = [Hành động/Giải pháp] + [Vấn đề nghiên cứu chuyên ngành] + tại [Tên đầy đủ cơ quan/công ty/doanh nghiệp thực tập].
Ví dụ: "Một số giải pháp hoàn thiện hoạt động Marketing Mix tại Công ty TNHH Thương mại Dịch vụ ABC".
2. Quy định thời gian nghiên cứu:
- Dữ liệu thực trạng tại đơn vị (Chương 2): Phải là giai đoạn 03 năm gần nhất (ví dụ: giai đoạn 2023 - 2025 hoặc 2024 - 2026).
- Định hướng giải pháp (Chương 3): Định hướng cho giai đoạn 03 năm tiếp theo (ví dụ: giai đoạn 2026 - 2029).
- Tuyệt đối không để mốc thời gian lệch pha giữa tên đề tài, số liệu thực trạng Chương 2 và giải pháp Chương 3.', 'đặt tên đề tài, thực tập tốt nghiệp, mốc thời gian nghiên cứu, 3 năm gần nhất, định hướng giải pháp', 648
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  501, 5, 'Hướng dẫn Thực tập tốt nghiệp & Xây dựng đề cương báo cáo 3 chương chuẩn Khoa QTKD', 'Quy tắc 1 & 2', 'Quy tắc đặt tên đề tài thực tập tốt nghiệp và mốc thời gian nghiên cứu bắt buộc', '1. Cấu trúc bắt buộc của Tên đề tài:
Tên đề tài = [Hành động/Giải pháp] + [Vấn đề nghiên cứu chuyên ngành] + tại [Tên đầy đủ cơ quan/công ty/doanh nghiệp thực tập].
Ví dụ: "Một số giải pháp hoàn thiện hoạt động Marketing Mix tại Công ty TNHH Thương mại Dịch vụ ABC".
2. Quy định thời gian nghiên cứu:
- Dữ liệu thực trạng tại đơn vị (Chương 2): Phải là giai đoạn 03 năm gần nhất (ví dụ: giai đoạn 2023 - 2025 hoặc 2024 - 2026).
- Định hướng giải pháp (Chương 3): Định hướng cho giai đoạn 03 năm tiếp theo (ví dụ: giai đoạn 2026 - 2029).
- Tuyệt đối không để mốc thời gian lệch pha giữa tên đề tài, số liệu thực trạng Chương 2 và giải pháp Chương 3.', 'đặt tên đề tài, thực tập tốt nghiệp, mốc thời gian nghiên cứu, 3 năm gần nhất, định hướng giải pháp'
);

INSERT INTO document_chunks (id, document_id, chunk_index, chapter, article, clause, page_number, heading, content, keywords, char_count) VALUES (
  502, 5, 2, 'Phần II: Kết cấu Báo cáo thực tập tốt nghiệp 3 chương chuẩn', 'Quy tắc 3', 'Toàn văn', 4, 'Khung kết cấu 3 chương chuẩn hóa của Báo cáo thực tập tốt nghiệp Khoa QTKD', 'Báo cáo thực tập tốt nghiệp chính thức bao gồm 3 chương bắt buộc:
- Lời mở đầu: Tính cấp thiết, mục tiêu nghiên cứu, đối tượng & phạm vi, phương pháp nghiên cứu, ý nghĩa thực tiễn và kết cấu báo cáo.
- CHƯƠNG 1: CƠ SỞ LÝ LUẬN VỀ [VẤN ĐỀ NGHIÊN CỨU]
  + 1.1. Khái niệm và vai trò
  + 1.2. Nội dung / Quy trình thực hiện
  + 1.3. Các yếu tố ảnh hưởng
  + 1.4. Tiêu chí và chỉ tiêu đánh giá
- CHƯƠNG 2: THỰC TRẠNG [VẤN ĐỀ NGHIÊN CỨU] TẠI [TÊN DOANH NGHIỆP] GIAI ĐOẠN 3 NĂM
  + 2.1. Tổng quan về doanh nghiệp (Lịch sử hình thành, cơ cấu tổ chức, kết quả kinh doanh)
  + 2.2. Phân tích thực trạng vấn đề nghiên cứu
  + 2.3. Đánh giá chung: Ưu điểm, hạn chế và nguyên nhân cốt lõi
- CHƯƠNG 3: MỘT SỐ GIẢI PHÁP VÀ KIẾN NGHỊ NHẰM HOÀN THIỆN [VẤN ĐỀ NGHIÊN CỨU]
  + 3.1. Định hướng và mục tiêu phát triển của doanh nghiệp trong 3 năm tới
  + 3.2. Các giải pháp cụ thể (Giải pháp 1, Giải pháp 2, Giải pháp 3 có tính khả thi)
  + 3.3. Một số kiến nghị đối với cơ quan quản lý và đơn vị thực tập
- Kết luận, Danh mục tài liệu tham khảo và Phụ lục minh chứng.', 'kết cấu 3 chương, cơ sở lý luận, thực trạng, giải pháp, báo cáo thực tập, đề cương chi tiết', 1046
);
INSERT INTO document_chunks_fts (chunk_id, document_id, title, article, heading, content, keywords) VALUES (
  502, 5, 'Hướng dẫn Thực tập tốt nghiệp & Xây dựng đề cương báo cáo 3 chương chuẩn Khoa QTKD', 'Quy tắc 3', 'Khung kết cấu 3 chương chuẩn hóa của Báo cáo thực tập tốt nghiệp Khoa QTKD', 'Báo cáo thực tập tốt nghiệp chính thức bao gồm 3 chương bắt buộc:
- Lời mở đầu: Tính cấp thiết, mục tiêu nghiên cứu, đối tượng & phạm vi, phương pháp nghiên cứu, ý nghĩa thực tiễn và kết cấu báo cáo.
- CHƯƠNG 1: CƠ SỞ LÝ LUẬN VỀ [VẤN ĐỀ NGHIÊN CỨU]
  + 1.1. Khái niệm và vai trò
  + 1.2. Nội dung / Quy trình thực hiện
  + 1.3. Các yếu tố ảnh hưởng
  + 1.4. Tiêu chí và chỉ tiêu đánh giá
- CHƯƠNG 2: THỰC TRẠNG [VẤN ĐỀ NGHIÊN CỨU] TẠI [TÊN DOANH NGHIỆP] GIAI ĐOẠN 3 NĂM
  + 2.1. Tổng quan về doanh nghiệp (Lịch sử hình thành, cơ cấu tổ chức, kết quả kinh doanh)
  + 2.2. Phân tích thực trạng vấn đề nghiên cứu
  + 2.3. Đánh giá chung: Ưu điểm, hạn chế và nguyên nhân cốt lõi
- CHƯƠNG 3: MỘT SỐ GIẢI PHÁP VÀ KIẾN NGHỊ NHẰM HOÀN THIỆN [VẤN ĐỀ NGHIÊN CỨU]
  + 3.1. Định hướng và mục tiêu phát triển của doanh nghiệp trong 3 năm tới
  + 3.2. Các giải pháp cụ thể (Giải pháp 1, Giải pháp 2, Giải pháp 3 có tính khả thi)
  + 3.3. Một số kiến nghị đối với cơ quan quản lý và đơn vị thực tập
- Kết luận, Danh mục tài liệu tham khảo và Phụ lục minh chứng.', 'kết cấu 3 chương, cơ sở lý luận, thực trạng, giải pháp, báo cáo thực tập, đề cương chi tiết'
);

-- Khởi tạo danh bạ phòng ban theo Section H (trạng thái is_verified = 0, chưa có xác minh chính thức)
INSERT INTO departments (id, code, name, function_desc, is_verified, display_order) VALUES
  (1, 'DAO_TAO', 'Phòng Quản lý Đào tạo', 'Phụ trách kế hoạch học tập, thời khóa biểu, điểm thi, xét tốt nghiệp và cấp bằng', 0, 1),
  (2, 'CT_HSSV', 'Phòng Công tác Học sinh - Sinh viên', 'Phụ trách điểm rèn luyện, học bổng, miễn giảm học phí, bảo hiểm y tế và chế độ chính sách', 0, 2),
  (3, 'KHOA_QTKD', 'Khoa Quản trị - Kinh doanh', 'Quản lý đào tạo chuyên ngành, phân công giảng viên hướng dẫn thực tập và cố vấn học tập', 0, 3);

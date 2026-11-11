# CHƯƠNG 3. ĐO LƯỜNG RỦI RO

---

## GIỚI THIỆU CHƯƠNG 3
Chương 3 là chương giới thiệu các phương pháp đo lường rủi ro để người học có được kiến thức và kỹ năng thực hành đo lường rủi ro đảm bảo tính khoa học, toàn diện, liên tục và có hệ thống. Sau khi đã nhận dạng được các mối nguy hiểm tiềm ẩn ở Chương 2, bước đo lường rủi ro sẽ chuyển đổi các nhận định định tính thành các con số định lượng cụ thể về tần suất và quy mô tổn thất. Ngoài ra, sau khi đo lường được rủi ro của dự án, chứng khoán hoặc tài sản, người học sẽ có căn cứ khoa học vững chắc để đưa ra các quyết định đầu tư tối ưu, cân bằng hoàn hảo giữa rủi ro chấp nhận và mức sinh lời kỳ vọng.

---

## MỤC TIÊU CHƯƠNG 3
Sau khi học xong chương này, người học có khả năng:
* **Về kiến thức:**
  * Trình bày và giải thích sâu sắc các khái niệm: đo lường rủi ro, phân loại chi phí tổn thất (chi phí trực tiếp, chi phí gián tiếp, chi phí ẩn) và các yếu tố cần đo lường (xác suất xảy ra, mức độ nghiêm trọng).
  * Trình bày và giải thích được nội dung, công thức và nguyên lý vận hành của các phương pháp đo lường rủi ro thuần túy (phương pháp triển khai tổn thất, phân phối tổn thất chuẩn, nhị thức, Poisson).
  * Nắm vững phương pháp đo lường rủi ro suy đoán (đo lường rủi ro tài chính của một chứng khoán đơn lẻ và danh mục đầu tư đa tài sản theo lý thuyết danh mục Markowitz).
* **Về kỹ năng:**
  * Tính toán thành thạo các chỉ tiêu thống kê đo lường rủi ro tài chính: tỷ suất sinh lời kỳ vọng $E(R)$, phương sai $\sigma^2$, độ lệch chuẩn $\sigma$, hệ số biến thiên $CV$, hiệp phương sai $Cov(j,k)$ và hệ số tương quan $r_{jk}$.
  * Ứng dụng thành thạo ma trận đánh giá rủi ro $5 \times 5$ để phân cấp mức độ rủi ro và xác định thứ tự ưu tiên xử lý.
  * Ước lượng chính xác các chi phí giảm thiểu rủi ro, dự báo dòng tiền khiếu nại bồi thường và tính toán hiện giá chi phí tổn thất để xác định quy mô quỹ dự phòng tự bảo hiểm.
* **Về năng lực tự chủ và trách nhiệm:**
  * Ý thức sâu sắc tầm quan trọng của tính chính xác số liệu trong đo lường rủi ro; tuyệt đối không ngụy tạo số liệu hoặc đưa ra các phán đoán chủ quan thiếu căn cứ thống kê.
  * Cẩn trọng, tỉnh táo và có trách nhiệm khi phân tích tương quan rủi ro - lợi nhuận trước khi ra các quyết định đầu tư tài chính lớn.
  * Tuân thủ nghiêm ngặt các quy định về an toàn vốn và các chuẩn mực kiểm soát rủi ro trong tổ chức.

---

## PHƯƠNG PHÁP GIẢNG DẠY VÀ HỌC TẬP CHƯƠNG 3
* **Đối với người dạy:**
  * Sử dụng phương pháp giảng dạy tích cực kết hợp giữa diễn giảng lý thuyết mô hình toán học và hướng dẫn giải bài tập tính toán từng bước (Step-by-step calculation).
  * Sử dụng bảng biểu số liệu, đồ thị phân phối xác suất và máy tính cầm tay/Excel để minh họa trực quan các công thức tính phương sai, độ lệch chuẩn.
  * Yêu cầu người học thực hiện các bài tập tình huống đo lường rủi ro danh mục chứng khoán và dự báo khiếu nại tổn thất theo hình thức cá nhân và nhóm.
* **Đối với người học:**
  * Chủ động đọc kỹ giáo trình Chương 3, ôn lại các kiến thức thống kê xác suất cơ bản (kỳ vọng, phương sai, phân phối chuẩn, phân phối Poisson).
  * Chuẩn bị sẵn máy tính bỏ túi có chức năng tính thống kê ($SD, REG$) hoặc máy tính xách tay sử dụng phần mềm bảng tính.
  * Hoàn thành đầy đủ các bài tập tính toán mẫu và bài tập tình huống cuối chương, nộp lại cho giảng viên đúng thời hạn.

---

## ĐIỀU KIỆN THỰC HIỆN CHƯƠNG 3
* **Phòng học chuyên môn hóa/nhà xưởng:** Phòng học lý thuyết tiêu chuẩn, có trang bị máy chiếu độ phân giải cao phục vụ trình chiếu công thức toán học và bảng số liệu.
* **Trang thiết bị máy móc:** Máy chiếu, máy vi tính giảng viên có cài đặt phần mềm Microsoft Excel/SPSS để biểu diễn tính toán mô hình rủi ro, bảng viết và bút lông màu.
* **Học liệu, dụng cụ, nguyên vật liệu:** Giáo trình Quản trị rủi ro, sổ tay công thức tài chính, bảng tra cứu phân phối chuẩn $Z$, tập số liệu thống kê tổn thất mẫu, phiếu bài tập thực hành.
* **Các điều kiện khác:** Người học chuẩn bị máy tính cá nhân để thực hành xử lý số liệu.

---

## PHƯƠNG PHÁP KIỂM TRA VÀ ĐÁNH GIÁ CHƯƠNG 3
* **Nội dung:**
  * *Kiến thức:* Kiểm tra khả năng giải thích ý nghĩa kinh tế của các đại lượng thống kê ($E(R), \sigma, CV$), hiểu biết về phân loại chi phí tổn thất và ma trận rủi ro.
  * *Kỹ năng:* Đánh giá qua kỹ năng giải đúng các bài toán tính toán lợi nhuận kỳ vọng và độ lệch chuẩn của chứng khoán đơn lẻ và danh mục đầu tư; kỹ năng tính hiện giá dòng khiếu nại bồi thường.
  * *Năng lực tự chủ và trách nhiệm:* Đánh giá tính chính xác, tính trung thực trong việc tính toán số liệu và thái độ hợp tác trong giờ bài tập.
* **Phương pháp:**
  * *Điểm kiểm tra thường xuyên:* 1 cột điểm kiểm tra thông qua bài tập tính toán viết ngắn trên lớp (thời lượng 15 - 20 phút) hoặc hỏi đáp về ý nghĩa các chỉ số đo lường.
  * *Kiểm tra định kỳ lý thuyết:* Tích hợp vào bài kiểm tra giữa kỳ hoặc thi kết thúc học phần.

---

## NỘI DUNG CHƯƠNG 3

### I. Một số khái niệm

#### 1. Đo lường rủi ro
**Đo lường rủi ro (Risk Measurement)** là quá trình tính toán, xác định các thông số định lượng về **tần số (khả năng xảy ra)** và **mức độ nghiêm trọng (biên độ tổn thất)** của các rủi ro đã được nhận dạng, từ đó phân nhóm, xếp hạng mức độ nguy hiểm và sắp xếp thứ tự ưu tiên xử lý rủi ro trong tổ chức.

Đo lường rủi ro bao gồm hai nội dung khoa học trọng tâm:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        HAI NỘI DUNG TRỌNG TÂM CỦA ĐO LƯỜNG RỦI RO                      │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
         ┌──────────────────────────────────┴──────────────────────────────────┐
         ▼                                                                     ▼
┌──────────────────────────────────────────────┐      ┌──────────────────────────────────────────────┐
│       1. ĐO LƯỜNG TẦN SỐ CỦA TỔN THẤT        │      │    2. ĐO LƯỜNG MỨC ĐỘ NGHIÊM TRỌNG TỔN THẤT  │
│             (Loss Frequency)                 │      │                (Loss Severity)               │
├──────────────────────────────────────────────┤      ├──────────────────────────────────────────────┤
│ • Ước lượng xác suất ($P$) để một mối nguy   │      │ • Đo lường quy mô thiệt hại tài chính khi    │
│   hiểm phát sinh biến cố trong kỳ (1 năm).   │      │   biến cố thực sự xảy ra.                    │
│ • Giả định: nếu một đối tượng chỉ gặp tối đa │      │ • Xác định Tổn thất tối đa có thể có (PML)   │
│   1 tổn thất/năm thì xác suất = tần số năm.  │      │ • Ước tính giá trị tổn thất trung bình kỳ    │
│ • Ứng dụng quy luật số lớn và phân phối xác  │      │   vọng cho mỗi lần xảy ra tai nạn.           │
│   suất rời rạc (Nhị thức, Poisson).          │      │ • Phụ thuộc vào tính chất mối nguy hiểm.     │
└──────────────────────────────────────────────┘      └──────────────────────────────────────────────┘
```

* **Đo lường tần số của tổn thất (Loss Frequency):** Phản ánh số lần một sự cố rủi ro xuất hiện trong một khoảng thời gian nhất định (thường là một năm hoạt động). Một phương pháp ước lượng phổ biến là xác định xác suất để một nguy hiểm phát sinh tổn thất trong năm. Nếu giả định mỗi đối tượng chỉ có thể gặp tối đa một tổn thất trong năm, xác suất xảy ra tổn thất sẽ chính là tần số tổn thất hàng năm.
* **Đo lường mức độ nghiêm trọng của tổn thất (Loss Severity):** Phản ánh độ lớn, quy mô thiệt hại bằng tiền hoặc hiện vật của mỗi vụ tổn thất. Trong đó, chỉ tiêu quan trọng bậc nhất là **Tổn thất lớn nhất có thể có (Maximum Possible Loss - MPL)** hoặc **Tổn thất tối đa có thể dự kiến (Probable Maximum Loss - PML)**. Mức độ nghiêm trọng phụ thuộc vào bản chất của mối nguy hiểm (cháy nổ hay ngập lụt) và giá trị của đối tượng chịu phơi nhiễm.

---

#### 2. Các chi phí của tổn thất
Khi một sự cố rủi ro xảy ra, hậu quả thiệt hại không chỉ dừng lại ở các hư hỏng vật chất trước mắt mà còn kéo theo hàng loạt các chi phí phát sinh phức tạp. Để lượng hóa đầy đủ tổn thất, khoa học quản trị rủi ro phân chia chi phí của tổn thất thành 3 nhóm cơ bản:

##### 2.1. Chi phí trực tiếp
* **Khái niệm:** Chi phí trực tiếp (hay chi phí tổn thất trực tiếp) là toàn bộ các chi phí tài chính phát sinh ngay lập tức như một hệ quả trực tiếp từ sự tác động vật lý của mối nguy hiểm lên đối tượng phơi nhiễm (tài sản hoặc con người).
* **Ví dụ:** Khi ngọn lửa thiêu rụi phần mái nhà của một showroom bán lẻ, chi phí tổn thất trực tiếp chính là toàn bộ số tiền chi trả cho vật tư tôn, sắt thép, tiền công thợ để dỡ bỏ phần mái cháy và thi công lắp đặt lại phần mái nhà mới.
* **Đặc điểm kinh tế học:**
  * Là những khoản chi phí riêng biệt, phát sinh liên quan trực tiếp đến một đối tượng chịu chi phí cụ thể (từng sản phẩm, máy móc, đơn hàng). Các khoản này có thể hạch toán thẳng vào đối tượng chịu chi phí trên sổ sách kế toán.
  * Trong các doanh nghiệp sản xuất, chi phí trực tiếp thường chiếm tỷ trọng lớn trong tổng chi phí hoạt động, có nguyên nhân biến động rõ ràng, ít gây ra sai lệch thông tin giữa các bộ phận.

##### 2.2. Chi phí gián tiếp
* **Khái niệm:** Chi phí gián tiếp (hay chi phí tổn thất gián tiếp) là toàn bộ các chi phí và tổn thất tài chính phát sinh có liên hệ mật thiết đến sự hư hỏng của mối nguy hiểm, nhưng các hậu quả tài chính này **không phải là kết quả tác động vật lý trực tiếp** của mối nguy hiểm lên đối tượng.
* **Ví dụ:** Vẫn trong tình huống showroom bán lẻ bị cháy mái nhà, tổn thất gián tiếp bao gồm:
  * Khoản doanh thu và lợi nhuận bị mất trắng trong suốt 2 tháng showroom phải đóng cửa để sửa chữa (Tổn thất gián đoạn kinh doanh - Business Interruption).
  * Tiền thuê mặt bằng tạm thời để tiếp tục hoạt động kinh doanh trong lúc chờ sửa chữa.
  * Chi phí trả lương giữ chân các nhân viên bán hàng chủ chốt trong thời gian cửa hàng tạm ngưng bán.
  * Khách hàng quen chuyển sang mua sắm tại cửa hàng đối thủ và không quay trở lại.
* **Đặc điểm kinh tế học:**
  * Chi phí gián tiếp thường tiềm ẩn, rất khó nhìn thấy ngay tại thời điểm xảy ra sự cố nhưng **hậu quả tài chính tích lũy về lâu dài thường lớn hơn chi phí trực tiếp gấp nhiều lần** (thường gấp từ 3 đến 5 lần chi phí trực tiếp theo học thuyết Tảng băng tổn thất của Heinrich).
  * Chi phí gián tiếp thường liên quan đến nhiều đối tượng chịu chi phí chung trong doanh nghiệp, đòi hỏi phải lựa chọn tiêu thức phân bổ hợp lý, dễ dẫn đến những sai lệch thông tin chi phí nếu phân bổ cào bằng.

##### 2.3. Chi phí ẩn
* **Khái niệm:** Chi phí ẩn (Hidden Costs) là toàn bộ các chi phí tổn thất phát sinh do các lỗi sai hỏng ngầm trong hệ thống, bắt đầu từ khâu thu mua nguyên liệu đầu vào, quá trình gia công sản xuất cho đến khâu phân phối tiêu thụ sản phẩm đầu ra, mà hệ thống kế toán thông thường không ghi nhận thành các khoản mục riêng lẻ.
* **Các biểu hiện cụ thể của chi phí ẩn:**
  * Tỷ lệ sản phẩm hỏng, phế phẩm, thứ phẩm phát sinh trong dây chuyền sản xuất phải bỏ đi hoặc bán thanh lý giá rẻ.
  * Khối lượng hàng hóa bị khách hàng từ chối nhận, trả lại do không đạt phẩm chất hoặc bị lỗi kỹ thuật.
  * Chi phí thu hồi sản phẩm khuyết tật trên toàn quốc (Product Recall) và chi phí xử lý tiêu hủy hàng lỗi.
  * Chi phí thời gian lãng phí: thời gian cấp quản lý phải dừng việc để họp xử lý khủng hoảng, giải trình với cơ quan chức năng và giải quyết khiếu nại của khách hàng.
  * Sự suy sụp tinh thần làm việc, tâm lý hoang mang lo lắng của công nhân sau khi chứng kiến đồng nghiệp bị tai nạn lao động nghiêm trọng, dẫn đến năng suất lao động toàn xưởng bị sụt giảm trong nhiều tuần liên tiếp.

---

#### 3. Các yếu tố cần đo lường rủi ro
Trong quá trình lượng hóa rủi ro, hai yếu tố mang tính chất then chốt quyết định mức độ nguy hiểm của một sự cố rủi ro là: **(1) Khả năng xảy ra của rủi ro** và **(2) Mức độ nghiêm trọng của rủi ro**.

##### 3.1. Khả năng xảy ra của rủi ro
Khả năng xảy ra của rủi ro (tần suất xuất hiện) phản ánh xác suất hoặc nhịp độ lặp lại của các biến cố rủi ro trong chu kỳ hoạt động của doanh nghiệp. Để chuẩn hóa công tác đánh giá, tổ chức xây dựng thang đo 5 bậc như Bảng 3.1:

> **Bảng 3.1: Bảng phân cấp khả năng xảy ra của rủi ro (Tần suất)**
>
> | Khả năng xảy ra | Điểm mức độ | Mô tả xác suất và chu kỳ lặp lại |
> | :--- | :---: | :--- |
> | **Rất khó xảy ra** | **1** | Biến cố cực kỳ hiếm gặp, chỉ có thể xuất hiện sau hơn 10 năm một lần ($P < 5\%$). |
> | **Hiếm khi** | **2** | Biến cố có thể xảy ra trong khoảng thời gian từ 5 đến 10 năm một lần ($5\% \le P < 20\%$). |
> | **Thỉnh thoảng** | **3** | Biến cố có thể xảy ra trong chu kỳ khoảng 5 năm một lần ($20\% \le P < 50\%$). |
> | **Có thể xảy ra** | **4** | Biến cố có khả năng xảy ra khoảng 1 lần trong mỗi năm hoạt động ($50\% \le P < 80\%$). |
> | **Gần như chắc chắn** | **5** | Biến cố có tần suất xuất hiện rất cao, xảy ra nhiều lần trong một năm ($P \ge 80\%$). |

##### 3.2. Mức độ nghiêm trọng của rủi ro
Mức độ nghiêm trọng phản ánh quy mô tổn thất và mức độ tàn phá của biến cố đối với các mục tiêu kinh doanh của tổ chức, được chuẩn hóa theo thang đo 5 bậc tại Bảng 3.2:

> **Bảng 3.2: Bảng phân cấp mức độ nghiêm trọng của rủi ro (Hậu quả)**
>
> | Phân cấp mức độ | Điểm mức độ | Mức độ ảnh hưởng đối với mục tiêu của tổ chức |
> | :--- | :---: | :--- |
> | **Không đáng kể** | **1** | Ảnh hưởng tài chính rất nhỏ ($< 1\%$ ngân sách), điều chỉnh bình thường trong tác nghiệp. |
> | **Ít** | **2** | Ảnh hưởng nhỏ đến một vài chỉ tiêu bộ phận, cần nỗ lực nhỏ để điều chỉnh ($1 - 5\%$ ngân sách). |
> | **Nhiều** | **3** | Một số chỉ tiêu quan trọng bị ảnh hưởng, đòi hỏi sự điều chỉnh nguồn lực đáng kể ($5 - 15\%$). |
> | **Nghiêm trọng** | **4** | Hầu hết các mục tiêu chiến lược bị đe dọa, thiệt hại tài chính nặng nề ($15 - 30\%$ ngân sách). |
> | **Rất nghiêm trọng** | **5** | Toàn bộ mục tiêu bị sụp đổ, đe dọa trực tiếp sự tồn vong của doanh nghiệp ($> 30\%$ ngân sách). |

##### 3.3. Định lượng mức độ rủi ro và xác định thứ tự ưu tiên
Sau khi đã xác định được điểm số của Tần suất ($b$) và Mức độ nghiêm trọng ($a$), mức độ rủi ro tổng hợp được xác định theo công thức:

$$\text{Mức độ rủi ro} = a \times b$$

*Trong đó:*
* $a$: Điểm đánh giá mức độ nghiêm trọng của tổn thất (thang điểm từ 1 đến 5).
* $b$: Điểm đánh giá khả năng xảy ra rủi ro (thang điểm từ 1 đến 5).
* *Trường hợp mở rộng:* Đối với các hoạt động thiết kế kỹ thuật, chế tạo máy và kiểm soát quy trình sản xuất (theo phương pháp phân tích phương thức sai hỏng và tác động - FMEA), mức độ rủi ro (Risk Priority Number - RPN) được tính bằng tích của 3 nhân tố: $\text{Mức độ rủi ro} = a \times b \times c$, trong đó $c$ là điểm đánh giá khả năng có thể phát hiện sai hỏng trước khi sản phẩm đến tay khách hàng.

> **Bảng 3.3: Ma trận đánh giá mức độ rủi ro ($5 \times 5$)**
>
> | Khả năng xảy ra ($b$) \ Mức độ ảnh hưởng ($a$) | Không đáng kể (1) | Nhỏ (2) | Trung bình (3) | Nhiều (4) | Nghiêm trọng (5) |
> | :--- | :---: | :---: | :---: | :---: | :---: |
> | **Hầu như chắc chắn xảy ra (5)** | 5 | 10 | 15 | 20 | **25** |
> | **Dễ xảy ra (4)** | 4 | 8 | 12 | 16 | 20 |
> | **Có thể xảy ra (3)** | 3 | 6 | 9 | 12 | 15 |
> | **Khó xảy ra (2)** | 2 | 4 | 6 | 8 | 10 |
> | **Hiếm khi xảy ra (1)** | 1 | 2 | 3 | 4 | 5 |

Dựa trên điểm số rủi ro tính toán, nhà quản trị đối chiếu vào **Ma trận thứ tự ưu tiên xử lý (Bảng 3.4)** được chia thành 4 góc phần tư chiến lược:

> **Bảng 3.4: Ma trận thứ tự ưu tiên giải quyết rủi ro**
>
> | Tần suất \ Hậu quả | HẬU QUẢ THẤP (Mức độ nghiêm trọng nhỏ) | HẬU QUẢ CAO (Mức độ nghiêm trọng lớn) |
> | :--- | :--- | :--- |
> | **TẦN SUẤT CAO**<br>*(Xảy ra thường xuyên)* | **Ô (III): HÀNH ĐỘNG NẾU HIỆU QUẢ VỀ CHI PHÍ**<br>• Tần suất cao nhưng tổn thất mỗi vụ thấp.<br>• *Biện pháp:* Ngăn ngừa kỹ thuật, trích lập quỹ tự bảo hiểm nội bộ. | **Ô (IV): HÀNH ĐỘNG KHẨN CẤP / NGAY LẬP TỨC**<br>• Tần suất cao và hậu quả mỗi lần đều thảm khốc.<br>• *Biện pháp:* **Né tránh rủi ro**, tái cấu trúc triệt để quy trình. |
> | **TẦN SUẤT THẤP**<br>*(Hiếm khi xảy ra)* | **Ô (I): KHÔNG CẦN HÀNH ĐỘNG (LƯU GIỮ)**<br>• Tần suất thấp và tổn thất không đáng kể.<br>• *Biện pháp:* Chấp nhận rủi ro, tự bù đắp bằng chi phí vận hành. | **Ô (II): YÊU CẦU HÀNH ĐỘNG (CHUYỂN GIAO)**<br>• Hiếm khi xảy ra nhưng khi xảy ra thì phá sản.<br>• *Biện pháp:* **Chuyển giao bảo hiểm thương mại**, dự phòng khẩn cấp. |

*Ví dụ minh họa đo lường khả năng thu hồi nợ của khách hàng:*
Một doanh nghiệp thương mại quy định phương thức bán hàng cho nợ 1 tháng (nếu khách trả tiền mặt ngay được chiết khấu 3%). Doanh nghiệp xây dựng thang đo theo dõi nợ quá hạn như sau:

> **Bảng 3.5: Thang đo rủi ro thu hồi nợ của khách hàng**
>
> | Thời gian quá hạn thanh toán | Điểm mức độ ($a$) | Đánh giá rủi ro tín dụng |
> | :--- | :---: | :--- |
> | **Dưới 1 tháng** | 1 | Rủi ro rất thấp, nằm trong hạn mức tín dụng cho phép. |
> | **Từ 1 đến 2 tháng** | 2 | Khách hàng bắt đầu chậm trả, bộ phận kinh doanh nhắc nợ. |
> | **Từ 2 đến 4 tháng** | 3 | Rủi ro nợ khó đòi tăng, tạm ngừng cấp thêm hạn mức tín dụng mới. |
> | **Từ 4 đến 6 tháng** | 4 | Rủi ro nghiêm trọng, chuyển hồ sơ sang bộ phận pháp chế xử lý. |
> | **Trên 6 tháng** | 5 | Rủi ro mất vốn hoàn toàn, trích lập dự phòng nợ phải thu khó đòi $100\%$ và khởi kiện. |

---

### II. Phương pháp đo lường rủi ro

Trong thực tế, các phương pháp đo lường rủi ro được phân định rạch ròi theo hai nhóm: **(1) Đo lường rủi ro thuần túy** (chỉ có tổn thất) và **(2) Đo lường rủi ro suy đoán** (rủi ro tài chính có lời hoặc lỗ).

---

#### 1. Đo lường rủi ro thuần túy

##### 1.1. Phương pháp triển khai tổn thất (Loss Development Method)
Phương pháp triển khai tổn thất là kỹ thuật thống kê định lượng dựa trên số liệu lịch sử về các vụ khiếu nại bồi thường trong quá khứ để ước lượng tổng số tiền bồi thường tổn thất có thể phát sinh trong tương lai đối với một nhóm sản phẩm hoặc lô hàng.

Quy trình thực hiện gồm 4 bước chuẩn mực:
* **Bước 1: Xác định hệ số triển khai (Loss Development Factors):** Phân tích tốc độ báo cáo khiếu nại qua các năm trong quá khứ để xác định tỷ lệ phần trăm tích lũy và hệ số triển khai tương ứng cho từng kỳ.
  $$\text{Hệ số triển khai từng kỳ} = \frac{\text{Tổng số khiếu nại ước tính đạt } 100\%}{\text{Số khiếu nại cộng dồn đến kỳ đó}}$$
* **Bước 2: Dự báo tổng số khiếu nại có thể có:**
  $$\text{Tổng khiếu nại có thể có} = \text{Số khiếu nại đã báo cáo tại kỳ xem xét} \times \text{Hệ số triển khai tương ứng}$$
* **Bước 3: Dự báo dòng khiếu nại bồi thường theo từng năm:** Phân bổ tổng số khiếu nại dự báo vào từng năm theo tỷ lệ phát sinh lịch sử.
* **Bước 4: Dự báo dòng tiền thanh toán và tính toán hiện giá (Present Value - PV):**
  $$\text{Hiện giá chi phí bồi thường } (PV) = \sum_{t=1}^n \frac{CF_t}{(1 + r)^t}$$
  *Trong đó:* $CF_t$ là dòng tiền chi trả bồi thường ở năm $t$, $r$ là lãi suất chiết khấu hàng năm, $n$ là thời gian triển khai bồi thường.

---

> **Ví dụ tính toán minh họa từng bước (Ví dụ triển khai tổn thất):**
>
> Một công ty sản xuất phân tích dữ liệu lịch sử nhận thấy quy luật phát sinh khiếu nại bảo hành sản phẩm như sau:
> * Trong năm thứ nhất (năm phát hành): có $40\%$ số khiếu nại được thông báo.
> * Trong năm thứ hai: có thêm $40\%$ số khiếu nại được thông báo (lũy kế đạt $80\%$).
> * Trong năm thứ ba: có thêm $20\%$ số khiếu nại cuối cùng được thông báo (lũy kế đạt $100\%$).
> * Chi phí bình quân xử lý một vụ khiếu nại là $15.000 \text{ USD}$, thanh toán vào thời điểm cuối mỗi năm.
> * Trong năm 1 của một dòng sản phẩm mới, số lượng khiếu nại thực tế đã được thông báo là **24 vụ**.
> * Lãi suất chiết khấu của công ty là $r = 9\%/\text{năm}$.
> 
> **Yêu cầu:**
> 1. Xác định hệ số triển khai tổn thất và dự báo tổng số khiếu nại có thể có của dòng sản phẩm này.
> 2. Dự báo dòng tiền chi trả bồi thường trong từng năm (Năm 1, Năm 2, Năm 3).
> 3. Tính toán hiện giá $(PV)$ của tổng chi phí bồi thường về thời điểm đầu năm 1.
>
> ---
>
> **BÀI GIẢI CHI TIẾT:**
>
> **Bước 1: Tính toán hệ số triển khai tổn thất**
> * Năm 1: Tỷ lệ lũy kế là $40\% = 0,4$. Hệ số triển khai Năm 1: $f_1 = \frac{100\%}{40\%} = \frac{1}{0,4} = \mathbf{2,5}$.
> * Năm 2: Tỷ lệ lũy kế là $40\% + 40\% = 80\% = 0,8$. Hệ số triển khai Năm 2: $f_2 = \frac{100\%}{80\%} = \frac{1}{0,8} = \mathbf{1,25}$.
> * Năm 3: Tỷ lệ lũy kế là $100\% = 1,0$. Hệ số triển khai Năm 3: $f_3 = \frac{100\%}{100\%} = \mathbf{1,0}$.
>
> **Bước 2: Dự báo tổng số khiếu nại có thể có của lô hàng**
> $$\text{Tổng số khiếu nại dự kiến} = \text{Khiếu nại thực tế Năm 1} \times f_1 = 24 \times 2,5 = \mathbf{60 \text{ khiếu nại}}$$
>
> **Bước 3: Dự báo dòng khiếu nại phân bổ theo từng năm**
> * Số khiếu nại phát sinh Năm 1: $60 \times 40\% = \mathbf{24 \text{ khiếu nại}}$ (đúng bằng số thực tế).
> * Số khiếu nại phát sinh Năm 2: $60 \times 40\% = \mathbf{24 \text{ khiếu nại}}$.
> * Số khiếu nại phát sinh Năm 3: $60 \times 20\% = \mathbf{12 \text{ khiếu nại}}$.
> * *Tổng cộng 3 năm:* $24 + 24 + 12 = 60 \text{ khiếu nại}$.
>
> **Bước 4: Dự báo dòng tiền chi trả và hiện giá về đầu năm 1 ($r = 9\%$)**
> * *Dòng tiền chi trả Năm 1:* $CF_1 = 24 \times 15.000 \text{ USD} = \mathbf{360.000 \text{ USD}}$.
>   $$PV_1 = \frac{360.000}{(1 + 0,09)^1} = \frac{360.000}{1,09} = \mathbf{330.275 \text{ USD}}$$
> * *Dòng tiền chi trả Năm 2:* $CF_2 = 24 \times 15.000 \text{ USD} = \mathbf{360.000 \text{ USD}}$.
>   $$PV_2 = \frac{360.000}{(1 + 0,09)^2} = \frac{360.000}{1,1881} = \mathbf{303.005 \text{ USD}}$$
> * *Dòng tiền chi trả Năm 3:* $CF_3 = 12 \times 15.000 \text{ USD} = \mathbf{180.000 \text{ USD}}$.
>   $$PV_3 = \frac{180.000}{(1 + 0,09)^3} = \frac{180.000}{1,295029} = \mathbf{138.993 \text{ USD}}$$
> * *Tổng dòng tiền thanh toán chưa chiết khấu:* $360.000 + 360.000 + 180.000 = \mathbf{900.000 \text{ USD}}$.
> * *Hiện giá tổng chi phí tổn thất về đầu năm 1:*
>   $$PV = PV_1 + PV_2 + PV_3 = 330.275 + 303.005 + 138.993 = \mathbf{772.273 \text{ USD}}$$
> *(Ý nghĩa quản trị: Doanh nghiệp chỉ cần trích lập sẵn số tiền $772.273 \text{ USD}$ ở thời điểm hiện tại và gửi sinh lời với lãi suất $9\%/\text{năm}$ là đã đủ khả năng chi trả toàn bộ nghĩa vụ bồi thường $900.000 \text{ USD}$ trong suốt 3 năm).*

---

##### 1.2. Phương pháp ước lượng phân phối tổn thất
Phương pháp này sử dụng các lý thuyết phân phối xác suất thống kê để mô hình hóa tần số xuất hiện tai nạn và phân phối quy mô thiệt hại của tổ chức.

###### a) Ba phân phối xác suất kinh điển trong quản trị rủi ro
1. **Phân phối nhị thức (Binomial Distribution):**
   * *Điều kiện áp dụng:* Áp dụng khi nghiên cứu một nhóm gồm $n$ đơn vị độc lập phơi nhiễm rủi ro (ví dụ: $n$ chiếc xe tải trong đội xe của công ty), trong đó mỗi đơn vị trong năm chỉ có thể gặp tối đa 1 tai nạn với xác suất không đổi là $p$.
   * *Công thức tính xác suất để có đúng $r$ vụ tai nạn:*
     $$P(X = r) = C_n^r p^r (1 - p)^{n - r} = \frac{n!}{r!(n - r)!} p^r (1 - p)^{n - r}$$
   * *Số lượng tai nạn kỳ vọng (Trung bình):*
     $$E(X) = n \cdot p$$
   * *Độ lệch chuẩn của số lượng tai nạn:*
     $$\sigma_X = \sqrt{n \cdot p \cdot (1 - p)}$$

2. **Phân phối Poisson (Poisson Distribution):**
   * *Điều kiện áp dụng:* Phân phối Poisson là phân phối của các biến số rời rạc, cực kỳ hữu hiệu để mô tả số lượng tai nạn xuất hiện trong một khoảng thời gian xác định khi xác suất xảy ra tai nạn ở mỗi thời điểm là rất nhỏ nhưng số cơ hội phơi nhiễm lại rất lớn. Poisson là phân phối đặc biệt chỉ có **duy nhất một tham số là giá trị kỳ vọng ($m$ hoặc $\lambda$)**.
   * *Công thức tính xác suất để có đúng $r$ vụ tai nạn xảy ra:*
     $$P(X = r) = \frac{e^{-m} \cdot m^r}{r!}$$
     *Trong đó:*
     * $m$: Số lượng tai nạn kỳ vọng trong kỳ ($m > 0$).
     * $e$: Cơ số logarit tự nhiên ($e \approx 2,71828$).
     * $r!$: Giai thừa của số vụ tai nạn ($r! = r \times (r-1) \times \dots \times 1$; với quy ước $0! = 1$).

> **Bảng 3.6: Bảng tính phân phối Poisson với giá trị kỳ vọng $m = 2,0$**
>
> *(Cơ sở tính toán: $e^{-2} = \frac{1}{2,71828^2} \approx 0,1353$)*
>
> | Số vụ tai nạn ($r$) | Công thức chi tiết | Giá trị xác suất $P(X = r)$ |
> | :---: | :--- | :---: |
> | **$r = 0$** | $\frac{e^{-2} \cdot 2^0}{0!} = \frac{0,1353 \times 1}{1}$ | **$0,1353$** ($13,53\%$) |
> | **$r = 1$** | $\frac{e^{-2} \cdot 2^1}{1!} = \frac{0,1353 \times 2}{1}$ | **$0,2706$** ($27,06\%$) |
> | **$r = 2$** | $\frac{e^{-2} \cdot 2^2}{2!} = \frac{0,1353 \times 4}{2}$ | **$0,2706$** ($27,06\%$) |
> | **$r = 3$** | $\frac{e^{-2} \cdot 2^3}{3!} = \frac{0,1353 \times 8}{6}$ | **$0,1804$** ($18,04\%$) |
> | **$r = 4$** | $\frac{e^{-2} \cdot 2^4}{4!} = \frac{0,1353 \times 16}{24}$ | **$0,0902$** ($9,02\%$) |
> | **$r = 5$** | $\frac{e^{-2} \cdot 2^5}{5!} = \frac{0,1353 \times 32}{120}$ | **$0,0361$** ($3,61\%$) |
> | **$r = 6$** | $\frac{e^{-2} \cdot 2^6}{6!} = \frac{0,1353 \times 64}{720}$ | **$0,0120$** ($1,20\%$) |
> | **$r = 7$** | $\frac{e^{-2} \cdot 2^7}{7!} = \frac{0,1353 \times 128}{5040}$ | **$0,0034$** ($0,34\%$) |
> | **$r = 8$** | $\frac{e^{-2} \cdot 2^8}{8!} = \frac{0,1353 \times 256}{40320}$ | **$0,0009$** ($0,09\%$) |
> | **$r = 9$** | $\frac{e^{-2} \cdot 2^9}{9!} = \frac{0,1353 \times 512}{362880}$ | **$0,0002$** ($0,02\%$) |
> | **Tổng cộng** | $\sum_{r=0}^9 P(X = r)$ | **$0,9997 \approx 1,000$** |

3. **Phân phối chuẩn (Normal Distribution):**
   * *Điều kiện áp dụng:* Áp dụng khi nghiên cứu mức độ thiệt hại tài chính hoặc tỷ suất sinh lời của tài sản khi cỡ mẫu lớn và chịu tác động của nhiều nhân tố ngẫu nhiên độc lập. Phân phối chuẩn được xác định hoàn toàn bởi 2 tham số: giá trị trung bình $\mu$ (hoặc $E(X)$) và độ lệch chuẩn $\sigma$.
   * *Quy chuẩn hóa biến số về phân phối chuẩn tắc $Z \sim N(0, 1)$:*
     $$Z = \frac{X - \mu}{\sigma}$$
   * Tra cứu bảng giá trị tích lũy phân phối chuẩn tắc để tìm xác suất biến cố vượt quá một ngưỡng tổn thất định trước.

---

#### 2. Đo lường rủi ro suy đoán (Rủi ro tài chính)
Khác với rủi ro thuần túy, rủi ro suy đoán mang lại kết quả hai chiều (lời hoặc lỗ). Trọng tâm của đo lường rủi ro suy đoán là phân tích tương quan giữa **mức sinh lời kỳ vọng** và **mức độ biến động rủi ro**.

##### 2.1. Phương pháp đo lường rủi ro tài chính của một chứng khoán đơn lẻ
Đối với một tài sản tài chính hay chứng khoán đơn lẻ, nhà quản trị tài chính cần đo lường 4 chỉ số thống kê cơ bản:

###### 2.1.1. Lợi nhuận kỳ vọng của một chứng khoán ($E(R)$ hoặc $\bar{R}$)
Lợi nhuận kỳ vọng là giá trị bình quân gia quyền của các mức tỷ suất sinh lời có thể xảy ra trong các kịch bản kinh tế khác nhau, với trọng số là xác suất xảy ra của từng kịch bản:

$$E(R) = \sum_{i=1}^n P_i \cdot R_i$$

*Trong đó:*
* $R_i$: Tỷ suất sinh lời của chứng khoán trong kịch bản kinh tế thứ $i$.
* $P_i$: Xác suất xảy ra của kịch bản kinh tế thứ $i$ ($\sum_{i=1}^n P_i = 1$).
* $n$: Tổng số kịch bản kinh tế có thể xảy ra.

###### 2.1.2. Phương sai của một chứng khoán ($\sigma^2$)
Phương sai đo lường mức độ phân tán, dàn trải của các tỷ suất sinh lời thực tế xung quanh giá trị trung bình kỳ vọng:

$$\sigma^2 = \sum_{i=1}^n P_i \cdot \left[ R_i - E(R) \right]^2$$

Phương sai càng lớn thể hiện sự dao động của lợi nhuận càng mạnh, mức độ rủi ro của khoản đầu tư càng cao.

###### 2.1.3. Độ lệch chuẩn của một chứng khoán ($\sigma$)
Do phương sai có đơn vị tính là bình phương của tỷ suất lợi nhuận ($\%^2$), rất khó trực quan trong phân tích, người ta lấy căn bậc hai của phương sai để thu được **độ lệch chuẩn ($\sigma$)** có cùng đơn vị tính với tỷ suất lợi nhuận ($\%$):

$$\sigma = \sqrt{\sigma^2} = \sqrt{\sum_{i=1}^n P_i \cdot \left[ R_i - E(R) \right]^2}$$

Độ lệch chuẩn là thước đo tiêu chuẩn và trực quan nhất về **tổng mức rủi ro biến động** của một chứng khoán.

###### 2.1.4. Hệ số biến thiên của một chứng khoán ($CV$)
Khi so sánh hai chứng khoán có mức lợi nhuận kỳ vọng khác nhau, việc chỉ nhìn vào độ lệch chuẩn sẽ dẫn đến kết luận sai lầm. **Hệ số biến thiên (Coefficient of Variation - $CV$)** đo lường **mức độ rủi ro trên một đơn vị lợi nhuận kỳ vọng**:

$$CV = \frac{\sigma}{E(R)}$$

*Nguyên tắc ra quyết định:* Giữa các khoản đầu tư có mức sinh lời khác nhau, nhà đầu tư ưu tiên lựa chọn chứng khoán có **hệ số biến thiên $CV$ nhỏ nhất**, vì nó mang lại mức rủi ro thấp nhất cho mỗi $1\%$ tỷ suất sinh lời thu về.

---

> **Ví dụ tính toán minh họa (Đo lường rủi ro 1 chứng khoán đơn lẻ):**
> 
> Cổ phiếu của Công ty X có tỷ suất sinh lời phụ thuộc vào 3 trạng thái của nền kinh tế được cho trong bảng sau:
>
> | Trạng thái kinh tế | Xác suất ($P_i$) | Tỷ suất sinh lời ($R_i$) |
> | :--- | :---: | :---: |
> | Tăng trưởng mạnh | $0,3$ | $30\%$ ($0,30$) |
> | Bình thường | $0,5$ | $15\%$ ($0,15$) |
> | Suy thoái | $0,2$ | $-10\%$ ($-0,10$) |
>
> **Yêu cầu:** Tính $E(R), \sigma^2, \sigma$ và $CV$ của cổ phiếu X.
>
> ---
>
> **BÀI GIẢI CHI TIẾT TỪNG BƯỚC:**
>
> 1. **Lợi nhuận kỳ vọng:**
>    $$E(R) = 0,3 \times 30\% + 0,5 \times 15\% + 0,2 \times (-10\%) = 9\% + 7,5\% - 2\% = \mathbf{14,5\%} \quad (0,145)$$
>
> 2. **Phương sai:**
>    $$\begin{aligned}
>    \sigma^2 &= 0,3 \times (0,30 - 0,145)^2 + 0,5 \times (0,15 - 0,145)^2 + 0,2 \times (-0,10 - 0,145)^2 \\
>    &= 0,3 \times (0,155)^2 + 0,5 \times (0,005)^2 + 0,2 \times (-0,245)^2 \\
>    &= 0,3 \times 0,024025 + 0,5 \times 0,000025 + 0,2 \times 0,060025 \\
>    &= 0,0072075 + 0,0000125 + 0,012005 = \mathbf{0,019225}
>    \end{aligned}$$
>
> 3. **Độ lệch chuẩn:**
>    $$\sigma = \sqrt{0,019225} \approx \mathbf{0,13865} = \mathbf{13,87\%}$$
>
> 4. **Hệ số biến thiên:**
>    $$CV = \frac{\sigma}{E(R)} = \frac{13,87\%}{14,5\%} \approx \mathbf{0,956}$$

---

##### 2.2. Phương pháp đo lường rủi ro tài chính của danh mục đầu tư
Trong thực tế, các nhà đầu tư thông minh không bao giờ "bỏ tất cả trứng vào một giỏ" mà thực hiện phân bổ vốn vào một **danh mục đầu tư (Portfolio)** gồm nhiều tài sản nhằm phân tán rủi ro.

###### 2.2.1. Lợi nhuận kỳ vọng của danh mục đầu tư ($E(R_p)$)
Lợi nhuận kỳ vọng của một danh mục đầu tư gồm $m$ chứng khoán bằng bình quân gia quyền tỷ suất sinh lời của các chứng khoán thành phần, với trọng số là tỷ trọng vốn đầu tư:

$$E(R_p) = \sum_{j=1}^m W_j \cdot E(R_j)$$

*Trong đó:*
* $W_j$: Tỷ trọng vốn đầu tư vào chứng khoán thứ $j$ ($\sum_{j=1}^m W_j = 1$).
* $E(R_j)$: Lợi nhuận kỳ vọng của chứng khoán thứ $j$.
* $m$: Tổng số loại chứng khoán có trong danh mục.

> **Ví dụ 3 trong tài liệu gốc:**
> Một danh mục đầu tư gồm 3 chứng khoán A, B, C có số liệu như sau:
> * Chứng khoán A: Tỷ trọng $W_A = 50\% = 0,5$; Lợi nhuận kỳ vọng $E_A = 15\% = 0,15$.
> * Chứng khoán B: Tỷ trọng $W_B = 30\% = 0,3$; Lợi nhuận kỳ vọng $E_B = 12\% = 0,12$.
> * Chứng khoán C: Tỷ trọng $W_C = 20\% = 0,2$; Lợi nhuận kỳ vọng $E_C = 20\% = 0,20$.
>
> **Lợi nhuận kỳ vọng của danh mục đầu tư:**
> $$E(R_p) = W_A E_A + W_B E_B + W_C E_C = 0,5 \times 0,15 + 0,3 \times 0,12 + 0,2 \times 0,20 = 0,075 + 0,036 + 0,040 = \mathbf{0,151} = \mathbf{15,1\%}$$

---

###### 2.2.2. Phương sai và độ lệch chuẩn của danh mục đầu tư ($\sigma_p^2, \sigma_p$)
Khác với lợi nhuận kỳ vọng (chỉ là phép cộng gia quyền đơn giản), **phương sai và độ lệch chuẩn của danh mục đầu tư không bằng bình quân gia quyền độ lệch chuẩn của các chứng khoán**, mà phụ thuộc chặt chẽ vào mức độ tương quan dao động giữa các cặp chứng khoán:

$$\sigma_p^2 = \sum_{j=1}^m W_j^2 \sigma_j^2 + \sum_{j=1}^m \sum_{k=1, k \ne j}^m W_j W_k Cov(j, k)$$

Mặt khác, Hiệp phương sai giữa hai chứng khoán $j$ và $k$ được xác định thông qua **Hệ số tương quan ($r_{jk}$)**:

$$Cov(j, k) = r_{jk} \cdot \sigma_j \cdot \sigma_k$$

Do đó, công thức tính phương sai của danh mục đầu tư tổng quát là:

$$\sigma_p^2 = \sum_{j=1}^m W_j^2 \sigma_j^2 + \sum_{j=1}^m \sum_{k=1, k \ne j}^m W_j W_k r_{jk} \sigma_j \sigma_k$$

Và **Độ lệch chuẩn của danh mục đầu tư ($\sigma_p$)**:

$$\sigma_p = \sqrt{\sigma_p^2} = \sqrt{\sum_{j=1}^m W_j^2 \sigma_j^2 + \sum_{j=1}^m \sum_{k=1, k \ne j}^m W_j W_k r_{jk} \sigma_j \sigma_k}$$

*Trường hợp danh mục gồm 2 chứng khoán A và B:*
$$\sigma_p^2 = W_A^2 \sigma_A^2 + W_B^2 \sigma_B^2 + 2 W_A W_B r_{AB} \sigma_A \sigma_B$$
$$\sigma_p = \sqrt{W_A^2 \sigma_A^2 + W_B^2 \sigma_B^2 + 2 W_A W_B r_{AB} \sigma_A \sigma_B}$$

*Trong đó:*
* $W_A, W_B$: Tỷ trọng vốn của chứng khoán A và B ($W_A + W_B = 1$).
* $\sigma_A, \sigma_B$: Độ lệch chuẩn của chứng khoán A và B.
* $r_{AB}$: Hệ số tương quan lợi nhuận giữa hai chứng khoán A và B ($-1 \le r_{AB} \le +1$).

*Ý nghĩa của Hệ số tương quan $r_{AB}$ đối với việc giảm thiểu rủi ro:*
* Nếu $r_{AB} = +1$ (Tương quan đồng biến hoàn hảo): Việc kết hợp hai chứng khoán không mang lại tác dụng giảm thiểu rủi ro, $\sigma_p = W_A \sigma_A + W_B \sigma_B$.
* Nếu $r_{AB} < +1$: Luôn luôn xảy ra hiệu ứng triệt tiêu rủi ro, độ lệch chuẩn của danh mục luôn nhỏ hơn mức rủi ro trung bình gia quyền: $\sigma_p < W_A \sigma_A + W_B \sigma_B$.
* Nếu $r_{AB} = -1$ (Tương quan nghịch biến hoàn hảo): Nhà đầu tư có thể triệt tiêu hoàn toàn rủi ro ($\sigma_p = 0$) bằng cách phân bổ tỷ trọng thích hợp $W_A = \frac{\sigma_B}{\sigma_A + \sigma_B}$.

---

> **GIẢI TRỌN VẸN VÀ HIỆU CHỈNH TOÁN HỌC CHO VÍ DỤ 4 TRONG TÀI LIỆU GỐC:**
>
> *(Lưu ý: Trong tài liệu gốc, phần đáp án mục a bị để trống và mục b có lỗi ghi sai ký hiệu toán học $0.62 0.122...$. Dưới đây là bài giải hoàn chỉnh và chính xác tuyệt đối).*
>
> **Đề bài:** Một danh mục đầu tư gồm 2 loại chứng khoán A và B có các thông số:
> * Chứng khoán A: Tỷ trọng $W_A = 60\% = 0,6$; Lợi nhuận kỳ vọng $E_A = 15\% = 0,15$; Độ lệch chuẩn $\sigma_A = 12\% = 0,12$.
> * Chứng khoán B: Tỷ trọng $W_B = 40\% = 0,4$; Lợi nhuận kỳ vọng $E_B = 20\% = 0,20$; Độ lệch chuẩn $\sigma_B = 18\% = 0,18$.
> * Hệ số tương quan giữa hai chứng khoán: $r_{AB} = 0,5$.
> 
> **Yêu cầu:**
> a. Xác định lợi nhuận kỳ vọng của danh mục đầu tư trên.
> b. Xác định phương sai và độ lệch chuẩn của danh mục đầu tư trên.
>
> ---
>
> **ĐÁP ÁN VÀ BÀI GIẢI CHI TIẾT:**
>
> **a. Lợi nhuận kỳ vọng của danh mục đầu tư ($E(R_p)$):**
> $$E(R_p) = W_A E_A + W_B E_B = (0,6 \times 15\%) + (0,4 \times 20\%) = 9\% + 8\% = \mathbf{17\%} \quad (0,17)$$
>
> **b. Phương sai và Độ lệch chuẩn của danh mục đầu tư:**
> * *Áp dụng công thức phương sai danh mục 2 tài sản:*
>   $$\sigma_p^2 = W_A^2 \sigma_A^2 + W_B^2 \sigma_B^2 + 2 W_A W_B r_{AB} \sigma_A \sigma_B$$
> * *Tính từng số hạng chi tiết:*
>   * Số hạng 1: $W_A^2 \sigma_A^2 = (0,6)^2 \times (0,12)^2 = 0,36 \times 0,0144 = \mathbf{0,005184}$
>   * Số hạng 2: $W_B^2 \sigma_B^2 = (0,4)^2 \times (0,18)^2 = 0,16 \times 0,0324 = \mathbf{0,005184}$
>   * Số hạng 3 (Phần bù hiệp phương sai): 
>     $$2 W_A W_B r_{AB} \sigma_A \sigma_B = 2 \times 0,6 \times 0,4 \times 0,5 \times 0,12 \times 0,18 = 0,24 \times 0,0216 = \mathbf{0,005184}$$
> * *Tổng phương sai danh mục:*
>   $$\sigma_p^2 = 0,005184 + 0,005184 + 0,005184 = \mathbf{0,015552}$$
> * *Độ lệch chuẩn của danh mục đầu tư ($\sigma_p$):*
>   $$\sigma_p = \sqrt{0,015552} \approx \mathbf{0,1247076} = \mathbf{12,47\%}$$
>
> *Nhận xét và phân tích ý nghĩa kinh tế:*
> Nếu tính mức độ rủi ro trung bình gia quyền thông thường của hai chứng khoán: 
> $$\bar{\sigma} = W_A \sigma_A + W_B \sigma_B = (0,6 \times 12\%) + (0,4 \times 18\%) = 7,2\% + 7,2\% = \mathbf{14,4\%}$$
> Ta thấy rằng độ lệch chuẩn thực tế của danh mục chỉ là $\mathbf{12,47\%}$, thấp hơn đáng kể so với mức rủi ro $14,4\%$ của việc tính gộp. Điều này minh chứng một cách khoa học cho **lợi ích to lớn của việc đa dạng hóa danh mục đầu tư**: do hệ số tương quan giữa hai tài sản $r_{AB} = 0,5 < 1$, sự biến động bù trừ lẫn nhau đã giúp triệt tiêu một phần rủi ro cá biệt mà vẫn giữ nguyên được mức sinh lời kỳ vọng hấp dẫn $17\%$.

---

## TÓM TẮT CHƯƠNG 3
Trong chương này, các nội dung định lượng cốt lõi về đo lường rủi ro đã được trang bị có hệ thống:
1. **Một số khái niệm nền tảng:**
   * *Đo lường rủi ro:* Tính toán tần suất và biên độ nghiêm trọng của tổn thất để phân cấp thứ tự ưu tiên xử lý.
   * *Hệ thống chi phí tổn thất:* Gồm chi phí trực tiếp (thiệt hại vật chất trước mắt), chi phí gián tiếp (gián đoạn kinh doanh, mất uy tín) và chi phí ẩn (phế phẩm, hàng trả lại, suy giảm tinh thần nhân viên).
   * *Hai yếu tố định lượng cốt lõi:* Khả năng xảy ra rủi ro (thang điểm 1 - 5) và Mức độ nghiêm trọng của tổn thất (thang điểm 1 - 5). Ma trận rủi ro $5 \times 5$ và Ma trận thứ tự ưu tiên 4 góc phần tư giúp định hình chiến lược can thiệp.
2. **Phương pháp đo lường rủi ro thuần túy:**
   * *Phương pháp triển khai tổn thất:* Sử dụng hệ số triển khai để ước lượng tổng số vụ khiếu nại phát sinh từ các vụ tai nạn quá khứ, dự báo dòng tiền chi trả và tính hiện giá tổn thất ($PV$).
   * *Phương pháp phân phối tổn thất:* Sử dụng phân phối nhị thức, phân phối Poisson ($P(X=r) = \frac{e^{-m} m^r}{r!}$) và phân phối chuẩn để mô tả quy luật xuất hiện của tổn thất.
3. **Phương pháp đo lường rủi ro suy đoán (Rủi ro tài chính):**
   * *Đối với một chứng khoán đơn lẻ:* Lượng hóa thông qua 4 đại lượng: Lợi nhuận kỳ vọng $E(R)$, Phương sai $\sigma^2$, Độ lệch chuẩn $\sigma$ và Hệ số biến thiên $CV = \frac{\sigma}{E(R)}$.
   * *Đối với danh mục đầu tư:* Lợi nhuận danh mục $E(R_p) = \sum W_j E(R_j)$, trong khi rủi ro danh mục $\sigma_p$ phụ thuộc vào tương quan giữa các tài sản $r_{jk}$. Đa dạng hóa danh mục đầu tư giúp giảm thiểu tối đa rủi ro cá biệt.

---

## CÂU HỎI VÀ TÌNH HUỐNG THẢO LUẬN CHƯƠNG 3

### Bài tập tình huống thực hành cuối chương: Đo lường rủi ro danh mục cổ phiếu M và N
**Đề bài:** Nhà đầu tư đang theo dõi tỷ suất sinh lời thực tế của 2 cổ phiếu M và N niêm yết trên thị trường chứng khoán qua 5 thời kỳ lịch sử như sau:

| Thời kỳ | Tỷ suất sinh lời cổ phiếu M ($R_M$) | Tỷ suất sinh lời cổ phiếu N ($R_N$) |
| :---: | :---: | :---: |
| **1** | $+15\%$ | $+10\%$ |
| **2** | $-5\%$ | $+25\%$ |
| **3** | $+12\%$ | $+30\%$ |
| **4** | $+8\%$ | $+32\%$ |
| **5** | $+10\%$ | $-5\%$ |

**Yêu cầu:**
a. Tính tỷ suất sinh lời bình quân (lợi nhuận kỳ vọng) của mỗi cổ phiếu trong thời kỳ trên.
b. Tính phương sai và độ lệch chuẩn của từng cổ phiếu M và N.
c. Nếu nhà đầu tư rót vốn vào một danh mục đầu tư gồm $25\%$ cổ phiếu M và $75\%$ cổ phiếu N thì tỷ suất sinh lời kỳ vọng của danh mục này bằng bao nhiêu?

---

### HƯỚNG DẪN VÀ ĐÁP ÁN BÀI GIẢI CHI TIẾT:

#### a. Tính tỷ suất sinh lời bình quân của mỗi cổ phiếu
Do số liệu lịch sử có 5 thời kỳ với xác suất mỗi thời kỳ như nhau ($P_i = \frac{1}{5} = 0,2$):

* **Tỷ suất sinh lời bình quân cổ phiếu M ($\bar{R}_M$):**
  $$\bar{R}_M = \frac{15\% + (-5\%) + 12\% + 8\% + 10\%}{5} = \frac{40\%}{5} = \mathbf{8,0\%} \quad (0,08)$$

* **Tỷ suất sinh lời bình quân cổ phiếu N ($\bar{R}_N$):**
  $$\bar{R}_N = \frac{10\% + 25\% + 30\% + 32\% + (-5\%)}{5} = \frac{92\%}{5} = \mathbf{18,4\%} \quad (0,184)$$

---

#### b. Tính phương sai và độ lệch chuẩn của từng cổ phiếu

> **Bảng tính các độ lệch và bình phương độ lệch qua 5 thời kỳ:**
>
> | Thời kỳ | $R_{M,i}$ | $R_{M,i} - \bar{R}_M$ | $(R_{M,i} - \bar{R}_M)^2$ | $R_{N,i}$ | $R_{N,i} - \bar{R}_N$ | $(R_{N,i} - \bar{R}_N)^2$ | $(R_M - \bar{R}_M)(R_N - \bar{R}_N)$ |
> | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
> | **1** | $15\%$ | $+7\%$ ($0,07$) | $0,0049$ | $10\%$ | $-8,4\%$ ($-0,084$) | $0,007056$ | $-0,00588$ |
> | **2** | $-5\%$ | $-13\%$ ($-0,13$) | $0,0169$ | $25\%$ | $+6,6\%$ ($0,066$) | $0,004356$ | $-0,00858$ |
> | **3** | $12\%$ | $+4\%$ ($0,04$) | $0,0016$ | $30\%$ | $+11,6\%$ ($0,116$) | $0,013456$ | $+0,00464$ |
> | **4** | $8\%$ | $0\%$ ($0,00$) | $0,0000$ | $32\%$ | $+13,6\%$ ($0,136$) | $0,018496$ | $0,00000$ |
> | **5** | $10\%$ | $+2\%$ ($0,02$) | $0,0004$ | $-5\%$ | $-23,4\%$ ($-0,234$) | $0,054756$ | $-0,00468$ |
> | **Tổng** | — | — | **$0,0238$** | — | — | **$0,098120$** | **$-0,01450$** |

* **Đối với Cổ phiếu M:**
  * Phương sai mẫu ($n = 5$): 
    $$\sigma_M^2 = \frac{\sum (R_{M,i} - \bar{R}_M)^2}{n - 1} = \frac{0,0238}{4} = \mathbf{0,00595}$$
  * Độ lệch chuẩn cổ phiếu M:
    $$\sigma_M = \sqrt{0,00595} \approx \mathbf{0,0771} = \mathbf{7,71\%}$$

* **Đối với Cổ phiếu N:**
  * Phương sai mẫu ($n = 5$):
    $$\sigma_N^2 = \frac{\sum (R_{N,i} - \bar{R}_N)^2}{n - 1} = \frac{0,09812}{4} = \mathbf{0,02453}$$
  * Độ lệch chuẩn cổ phiếu N:
    $$\sigma_N = \sqrt{0,02453} \approx \mathbf{0,1566} = \mathbf{15,66\%}$$

* **Hệ số biến thiên ($CV$):**
  * $CV_M = \frac{7,71\%}{8,0\%} \approx 0,964$
  * $CV_N = \frac{15,66\%}{18,4\%} \approx 0,851$
  * *Nhận xét:* Dù cổ phiếu N có mức độ dao động tuyệt đối lớn hơn ($\sigma_N = 15,66\% > \sigma_M = 7,71\%$), nhưng hệ số biến thiên của N lại nhỏ hơn M ($0,851 < 0,964$), cho thấy cổ phiếu N sinh lời hiệu quả hơn trên mỗi đơn vị rủi ro chấp nhận.

---

#### c. Tỷ suất sinh lời kỳ vọng của danh mục đầu tư ($25\%$ M và $75\%$ N)
* Với tỷ trọng: $W_M = 25\% = 0,25$ và $W_N = 75\% = 0,75$:
  $$E(R_p) = W_M \bar{R}_M + W_N \bar{R}_N = (0,25 \times 8,0\%) + (0,75 \times 18,4\%) = 2,0\% + 13,8\% = \mathbf{15,8\%} \quad (0,158)$$

* *Mở rộng phân tích rủi ro danh mục:*
  * Hiệp phương sai mẫu: $Cov(M, N) = \frac{-0,01450}{4} = -0,003625$
  * Do hiệp phương sai mang dấu âm ($Cov(M, N) < 0$), hệ số tương quan $r_{MN} < 0$. Hai cổ phiếu có xu hướng dao động ngược chiều nhau, tạo ra hiệu ứng triệt tiêu rủi ro cực kỳ mạnh mẽ trong danh mục!
  * Phương sai danh mục:
    $$\begin{aligned}
    \sigma_p^2 &= W_M^2 \sigma_M^2 + W_N^2 \sigma_N^2 + 2 W_M W_N Cov(M, N) \\
    &= (0,25)^2 \times 0,00595 + (0,75)^2 \times 0,02453 + 2 \times 0,25 \times 0,75 \times (-0,003625) \\
    &= 0,0625 \times 0,00595 + 0,5625 \times 0,02453 - 0,375 \times 0,003625 \\
    &= 0,000371875 + 0,013798125 - 0,001359375 = \mathbf{0,012810625}
    \end{aligned}$$
  * Độ lệch chuẩn danh mục:
    $$\sigma_p = \sqrt{0,012810625} \approx \mathbf{0,11318} = \mathbf{11,32\%}$$
  * *Kết luận đầu tư:* Danh mục đạt mức sinh lời kỳ vọng rất cao là $\mathbf{15,8\%}$, trong khi độ lệch chuẩn rủi ro chỉ là $\mathbf{11,32\%}$, thấp hơn đáng kể so với mức rủi ro riêng lẻ của cổ phiếu N ($15,66\%$). Đây là quyết định phân bổ tài sản hoàn hảo cho nhà đầu tư.

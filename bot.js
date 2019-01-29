// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Import required Bot Framework classes.
const { ActivityTypes } = require('botbuilder');
const { CardFactory } = require('botbuilder');

// Adaptive Card content
// const IntroCard = require('./resources/IntroCard.json');

// Welcomed User property name
const WELCOMED_USER = 'welcomedUserProperty';

const swears = [
    'Đm :))',
    'Đm dũng ngáo :))',
    'giết thịt :))',
    'Nói tiếng người đi :))',
    'call nhé :))',
    'mưa rồi :(',
    'Thất bại :(',
    'Ae chết cmn hết rồi à'
];
const bichui = [
    'Con tinh trùng thất bại :))',
    'Sủa tiếp :D',
    'giết thịt :))',
    'Người khôn nói ít, nghe nhiều, lựa lời đối đáp, lựa điều hỏi han.',
    'Tu cái miệng là tu nửa đời :)',
    'đcm :))',
    'Chym to kệ em :v',
    'Xạo loz ko có j vui, chúng ta  ko nên xạo loz :))'
];

const deadGroup = [
    'Ơ kìa không ai nói gì đi à?',
    'Group chán vl, vote xoá group',
    '/me Cảm thấy lạnh lẽo...',
    'Group nát bét thật rồi',
    'Đéo còn ai ở group này nói chuyện với tôi cả, không còn ai...đi chung một đường....',
    'mưa rồi :(',
    'Thất bại :(',
    'Ae chết cmn hết rồi à',
    `Đĩa đậu phộng
  Boris rủ bạn Vova đến thăm bà ngoại. Bà nhờ Boris sửa vòi nước trong bếp. Vova ngồi ngoài phòng khách chờ, tranh thủ nhấm nháp hết đĩa đậu phộng để trên bàn. Khi cùng bạn ra về, Vova cảm ơn bà và phân bua:
  - Cháu cảm ơn bà về đĩa đậu phộng. Cháu đã lỡ ăn hết không chừa lại một hạt nào cho bà.
  - Không sao, lúc trước nó còn là đĩa chocolate cơ đấy! Vì không có răng, nên bà đã mút hết lớp vỏ chocolate bao quanh hạt đậu phộng rồi.
  -Vova ủa ?!!!
  `, `

  Vova tập vẽ
  Bố của trò Vova bị cô giáo mời đến gặp. Khắp mình ông dán đầy bông băng, ông mặc váy vừa lê bước vào đã nghe cô kể tội con mình:
  - Bác xem này! Em Vova vẽ con ruồi lên cái đinh trên bàn giáo viên. Tôi đập một nhát, chảy cả máu tay.
  - Trời ơi! Thế là còn nhẹ. Cô nhìn cái của tôi xem, đây là hậu quả của việc nó vẽ mẹ nó trên đống thủy tinh đấy!
  - Úi chao!
  `, `

  Cọ “C”
  Họp phụ huynh, cô giáo than phiền với bố Vova:
  - Vova không những thường xuyên đi học muộn mà lại còn nói láo nữa. Khi tôi hỏi “Sao đi muộn?” thì cháu thản nhiên nói rằng vì bận cọ c..
  - Cháu không nói láo đâu. Sáng nào tôi với nó cũng phải cọ c. mà.

  Bố Vova trả lời thế làm cô giáo giận lắm, kể lại chuyện đó cho mẹ Vova nghe. Mẹ Vova nói:
  - Hai bố con nó không nói láo đâu cô ạ. Thằng Vova cãi nhau với thằng hàng xóm Petka. Tối nào Petka cũng lấy sơn viết lên cửa nhà tôi chữ C. to tướng, sáng ra tôi bắt hai bố con nó phải cọ sạch cho nên cháu nó đi học muộn đấy ạ.

  `, `
  Lập chiến công

  Băng trên sông sắp tan. Có một cậu bé đang chìm dần xuống nước. Vôva nhảy
  ngay xuống nước và kéo được cậu bé đó lên.
  Trong giờ học cô Ivanova nói:
  - Các em, Vôva của chúng ta đã lập một chiến công – cứu người! Giờ thì bạn ấy sẽ
  kể cho chúng ta nghe câu chuyện đó.
  Vôva
  - Ơ, biết kể cái gì bây giờ? Thôi được rồi. Đầu tiên em cho cái thằng ngu đó mượn
  bánh xe trượt băng….
  `, `

  Vova trong giờ học vẽ
  Giờ họa, cô giáo dạy các em học sinh lớp hai vẽ trái tim. Cô vẽ mẫu trên bảng xong rồi quay xuống:
  - Các em vẽ đi!
  Cả lớp bắt đầu vẽ. Riêng Vova không vẽ. Cô giáo hỏi:
  - Sao em không vẽ?
  - Thưa cô – Vova trả lời – Cô vẽ còn thiếu.
  - Thiếu cái gì?
  - Áo quần.
  - Sao vậy?
  - Ở nhà lúc ngủ dậy, em nghe ba em nói với mẹ: “Trái tim của anh ơi, anh mặc áo quần cho em nhé!”

  `, `
  Mua xe tăng cho Vova

  Nhà Vova chật lắm, thời ngày xưa nhà được phân phối, không mất tiền, cho nên chỉ 17m2 là quý roài! Kệ, túp lều tranh, trái tim vàng!
  Nhưng dở cái là Vova bắt đầu đi học, đâm ra bố mẹ rất khó xử!
  Hôm ấy, vào dịp nghỉ lễ, nghỉ đơn nghỉ kép thế nào Vova được nghỉ học tới 4 ngày liền, chỉ vì hôm trước tiếc tiền, bố ko mua cho Vova cái xe tăng, thế là nó ám ở nhà suốt 3 hôm ròng, tình hình của bố mẹ thì ngày càng nước sôi lửa bỏng…..
  Cái khó ló cái khôn, bố nghĩ ra một diệu kế, bố bèn bảo Vova ra đứng ở ban công nhìn xung quanh có gì hay thì nói vào cho bố mẹ, khoảng nửa tiếng, nếu tốt bố cho 2 cái xe tăng….. Vova ok liền
  Thế là công vụ bắt đầu :
  Vova : Có hai xe tải đi ở dưới đường, một trắng một vàng…..
  Bố : Hự…. ự….ừ còn gì ko?
  Vova : Có hai đám mây bay trên trời, màu trắng
  Mẹ : A…..a…..còn gì nữa con?…..nữa…..
  Vova : Hết rồi, con vào nhé?
  Bố, Mẹ : Từ từ đã …… nhìn sang nhà bác Ivan xem nào?
  Vova : À, hai bác ấy đang ” xxx ”
  Bố mẹ nhảy dựng lên, hớt hải : Sao mày biết ?
  Vova: À, Con bé Natasa con học cũng đang đứng ban công nhìn sang đây mà!

  `, `

  Vova trong giờ kể chuyện..

  Cô giáo đang đọc truyện “Ba chú heo con” cho các bé nghe đến đoạn một chú heo gặp bác nông dân và xin rơm:
  - Bác ơi, cho cháu xin ít rơm nhé!
  Cô giáo ngừng lại hỏi Vova:

  - Con có biết bác nông dân nói gì không?
  Vova :
  - Thưa cô, bác ấy bảo: “Trời ơi! Một con heo biết nói!”.
  - Cô giáo tức đỏ mặt, vừa học bài “Sự tích bánh chưng, bánh dày”, Cô lại hỏi tiếp:
  -Thế em có biết bánh chưng có từ bao giờ không?
  - Tính theo mùa thì có từ giáp Tết, tính theo ngày thì có tại hàng quà sáng lúc 5 giờ ạ!
  Cô giáo tức không chịu được liền mắng :
  - Em có biết tuần này đã bị điểm 2 lần thứ ba rồi không? Vova :
  - Thưa cô, em đã hiểu ý nghĩa câu: “Ghét của nào trời trao của ấy”.

  `, `
  Vova vào lớp 1
  Bé Vôva vào lớp 1. Để buổi đi học đầu tiên của các cháu được hứng thú, cô giáo bắt đầu bằng trò chơi đố vui. Cô nghĩ đến cái bàn, rồi đặt câu hỏi :
  - Đố các em, trong nhà ta có cái gì bằng ǵỗ, có 4 chân?
  Bé Vôva nhanh nhảu:
  - Cái ghế ạ
  Cô gật gù, ừ, cái em nghĩ cũng được đấy, nhưng mà câu trả lời của cô là cái bàn. Rồi cô đố tiếp, lần này cô nghĩ đến con mèo:
  - Đố các em, trong nhà ta nuôi con ǵì có 4 chân mà các em hay vuốt ve nó?
  Bé Vôva vẫn là người nhanh nhất:
  - Thưa cô, con chó ạ.
  - Ừ cũng được đấy, cô nói, em giỏi lắm, nhưng cái câu trả lời của cô là con mèo cơ. Bé Vôva xin phép cô ra câu đố:
  - Đố cô, cái gì ́mà đàn ông hay giấu trong quần lâu lâu lấy ra sử dụng, dài dài, tṛòn tròn , đầu đỏ đỏ…
  Chưa nói hết câu, cô giáo đă nổi giận ngắt ngang:
  - Vôva, sao em dám ăn nói bậy bạ như vậy
  Nước mắt lưng tṛong, bé Vôva thút thít trả lời:
  - Cái mà cô nghĩ cũng được đấy, nhưng câu trả lời của em là những que diêm cơ…

  `, `

  Bố của Vova
  Hàng ngày Vôva thấy mẹ quát tháo bố, mỗi khi ông quá chén hoặc đôi khi bố Vôva quện chưa lau nhà, một hôm Vôva hỏi.
  - Tại sao bố khoẻ mà lại sợ mẹ thế, như con ấy chứ chẳng sợ mẹ tí nào cả…
  Bố Vôva nổi cáu:
  - mày thì biết gì, nói linh tinh , có những lúc mẹ m phải quỳ trước mặt tao hàng tiếng đồng hồ mà tao còn không them nói câu nào ấy chứ…
  Lúc đó mẹ Vôva đi chợ về:
  - E hèm, ông nói lúc nào ấy nhỉ?
  - Hì hì àh hôm trước anh chui vào gầm giường tìm cái bút chẳng may bị mắc kẹt,em lấy cán chổi lùa mãi anh mới ra được đấy!!!! may quá không có em thì chết…

  `, `
  Vova khó ngủ


  Một hôm cả lớp đi cắm trại, đến tối, khi cả lớp đã ngủ, cô hướng dẫn thấy Vô va mãi cứ trằn trọc, bèn hỏi:
  - Vô va, sao em không ngủ?
  - Thưa cô, vì ở nhà em hay sờ rốn mẹ mới ngủ được ạ. Vô va trả lời.
  Cô sau 1”” suy nghĩ thấy thương Vo va quá bèn bảo:
  - Thôi được, cho phép em sờ rốn cô đấy.
  Đang đêm, cô thấy nhột quá, bèn bảo:
  - Vova, đấy không phải là rốn đâu.
  - Dạ thưa cô, đấy cũng không phải là tay đâu ạ.
  -cô ?!!


  `, `
  Sao qua mặt được vova
  Vova học lớp một. Cô giáo lên lớp đứng trên bục giảng sơ ý thả một tiếng thơ ngọt ngào “pứ”. Xong cô giáo giả vờ làm rơi phấn, rơi thước kẻ, xoa xoa gót giầy xuống sàn, di di tay lên bảng… hòng che đi.
  Vova ngồi ngay bàn một, thấy cô giáo làm nhiều trò quá thản nhiên thốt ra buông thõng một câu: “Đếch giống!”

  `, `
  Con trai của Vova.
  Vova cùng ba ông bạn cũ lâu ngày không gặp tình cờ hội ngộ trong một nhà hàng sang trọng. Trong khi vova đi vệ sinh thì ba ông kia bắt đầu khoe khoang về sự thành đạt của con cái mình. Một ông nói:
  - Tôi tự hào về thằng con trai của tôi. Nó là một nhà kinh doanh địa ốc có tên tuổi và kiếm được rất nhiều tiền. Vì thế, nó rất hay làm việc từ thiện. Tuần trước, nó vừa hiến tặng một lô đất rộng ở ngoại ô thành phố.
  Ông thứ hai tiếp:
  - Thằng con của tôi cũng làm tôi cảm thấy tự hào. Nó làm nghề bán xe hơi và kiếm được nhiều tiền đến nỗi tuần trước nó vừa hiến tặng một chiếc Ferrari.
  Ông thứ ba tham gia:
  - Nhiều lúc tôi cũng không giấu được niềm tự hào về thằng con tôi. Nó kiếm được rất nhiều tiền và cũng thích làm từ thiện. Tuần trước, nó vừa hiến tặng một ngôi nhà trị giá 1 triệu đôla.
  Đúng lúc này,vova quay lại. Sau khi biết về chủ đề mọi người đang bàn tán, vova cũng kể thành tích của con trai mình:
  - Thằng con tôi thu nhập khá lắm. Nó làm vũ công thoát y ở một câu lạc bộ đồng tính luyến ái. Tuần trước, nó kiếm được một lô đất rộng, một chiếc Ferrari và một ngôi nhà trị giá 1 triệu đôla.
  `, `

  Đoán tuổi…

  VôVa năm nay 5 tuổi. Hàng ngày nó thường đi xe buýt đến trường mẫu giáo. Một lần nó gặp một thằng bé có lẽ cùng tuổi với nó. Chúng nó ngồi cùng hàng ghế đối diện với một cô gái mặc váy rất ngắn. Chúng bắt đầu làm quen với nhau.
  VôVa hỏi thằng bé : – Cậu mấy tuổi rồi ?
  - Tớ cũng không biết nữa. Thằng bé trả lời
  - Thế thì cậu nhìn ” kia ” xem có thấy gì không ?. Nói xong VôVa hất hàm về phía cô gái đối diện.
  - …….. ! ( Thằng bé nhún vai lắc đầu )
  - Thế thì cậu khoảng 4 tuổi. VôVa đáp !
  `, `

  Vova nghĩ bậy.
  Vova đi chơi với Nana. Vova chọn 1 cái ghế đá ngồi xuống, khổ đây là lần đầu tiên nên Vova lúng túng lắm không biết nói gì cả. Nghĩ mãi Vova đanh liều nói 1 câu :
  - Nana, ấy đang nghĩ gì thế?
  - Tớ nghĩ giống ấy !!!!!Nana trả lời bẽn lẽn.
  Bỗng Vova cười ha hả:
  - Khiếp sao ấy bậy thế!!!!!!!

  `, `
  Vova đi siêu thị.
  Vôva dắt em nó đi vào một siêu thị, chọn một bịch băng vệ sinh phụ nữ rồi mang ra quầy tính tiền. Lấy làm lạ, cô thu ngân nhìn chằm chằm vào hai đứa bé, rồi không nén nổi tò mò, cô hỏi.
  - Cháu bao nhiêu tuổi rồi?
  - Cháu lên tám. – Vôva đáp.
  Cô thu ngân hỏi tiếp:
  - Thế cháu có biết thứ này để làm gì không?
  - Cháu không rõ lắm. Nhưng thứ này không phải để cho cháu, mà cho thằng em cháu. – Vôva chỉ tay vào đứa em đi bên cạnh.
  - Cho em cháu? – Cô gái tròn mắt ngạc nhiên.
  - Đúng thế. Nó lên bốn tuổi. Chúng cháu xem trên tivi và thấy người ta nói rằng, nếu sử dụng thứ này, có thể bơi và đi xe đạp. Mà nó thì lại chưa biết cả hai thứ ấy…
  `, `


  Chóng lớn

  Vova vào phòng bố mẹ và không gõ cửa, và bắt gặp bố mẹ đang yêu nhau.
  - Bố mẹ làm gì thế? – Nó hỏi.
  - À – bà mẹ trả lời sau giây phút bối rối – Mẹ đang ngồi lên bụng bố để cho bụng bố nhỏ bớt đi.
  - Vô ích – thằng bé lắc đầu – ngày mai cô hàng xóm lại sang thổi cho nó to lên thôi,
  - ?!!

  `, `
  Nguồn gốc.
  Cô giáo giảng giải nguồn gốc loài người xuất phát từ sự tò mò của Adam và
  Eva. Vova giơ tay:
  - Cô nói sai rồi, bố em nói rằng tổ tiên chúng ta là KHỈ.
  Natasha quay sang bảo:
  - Vova, cô giáo đâu có nói riêng nguồn gốc gia đình cậu

  `, `

  Tè bằng gì?
  Một lần Vôva hỏi đứa bạn gái cùng lớp 1
  Mình tè bằng chim còn bạn tè bằng gì?
  Đứa bạn trả lời (mình tè bằng B…)
  Vôva lại hỏi, không biết Cô giáo tè bằng cái gì nhỉ?
  Đứa bạn gái của Vôva liền chạy đi xem, lúc sau nó chạy lại và thì thầm:
  Tớ thấy cô giáo tè bằng gì rồi “Cô ấy tè bằng bàn chải”
  `, `

  Bom trong bụng
  Vôva và bạn nó là Pechia nhìn thấy 1 người đàn ông trần truồng có cái bụng rất to trong bồn tắm. Hai đứa liền hỏi:
  - Bác ơi! Bác có cái gì trong bụng đấy!!!???
  - Bom đấy. – Người đàn ông trả lời.
  Vôva cầm sẵn lửa và thì thầm vào tai Pechia:
  - Chúng mình làm cho nó nổ đi.
  Penchia: Không được!!! Ngòi ngắn quá, nguy hiểm lắm…
  `, `

  Ngây thơ.

  Vova và Natasha, bạn thân lớp mẫu giáo của mình, ở nhà xem phim với ông
  nội. Đến đoạn xxx, ông nội bắt hai đứa quay đi. Vova còn hỏi vọng lại:
  - Họ đang làm gì đấy hả ông?
  - À, người ta đang chữa một căn bệnh nào đó.
  Vova quay sang thì thầm với Natasha:
  - Tội nghiệp, ông già rồi mà còn ngây thơ quá. Hay chúng mình nói cho ông biết
  là bệnh gì đi?

  `, `
  Không đẻ được.

  Một hôm Natasa mặt mày hớn hở khoe với Vova:
  - Tớ biết người lớn làm thế nào để đẻ con rồi.
  Vova tặc lưỡi:
  - Tưởng gì… Tớ còn biết làm thế nào để không đẻ được nữa kia!
  `, `

  Lớp một lên thẳng đại học.
  Vova năm nay 6 tuổi học lớp 1.
  Học được một tuần thì Vova chán học không chịu làm bài vở nữa, cô giáo bèn hỏi nguyên nhân tại sao thì Vova nói là tại chương trình học quá thấp so với trình độ của Vova và Vova xin cô cho lên học bậc trung học.
  Cô giáo dẫn Vova lên văn phòng ông hiệu trưởng, trình bày đầu đuôi câu chuyện. Ông hiểu trưởng bán tín bán nghi, bàn với cô giáo là ông sẽ hỏi Vova một số câu hỏi về Khoa học còn cô giáo sẽ hỏi Vova về kiến thức tổng quát, nếu Vova trả lời đúng ông sẽ cho Vova lên lớp.
  Sau gần 1 tiếng “tra tấn” Vova bằng những câu hỏi về khoa học, câu nào Vova cũng đáp đúng hết, ông hiệu trưởng rất hài lòng và giao cho cô giáo hỏi về kiến thức tổng quát.
  - Cô giáo : Con gì càng lớn càng nhỏ?
  Ông hiệu trưởng hết hồn
  - Vova : Dạ con cua có càng lớn và càng nhỏ.
  - Cô giáo : Cái gì trong quần em có mà cô không có?
  Ông hiệu trưởng xanh cả mặt.
  - Vova : Dạ là 2 cái túi quần.
  - Cô giáo : Ở nơi đâu lông của đàn bà quăn nhiều nhất?
  Ông hiệu trưởng run lên.
  - Vova : Dạ ở Phi Châu.
  - Cô giáo : Cái gì cô có ở giữa 2 chân của cô?
  Ông hiệu trưởng chết điếng người.
  - Vova : Dạ là cái đầu gối.
  - Cô giáo : Cái gì trong người của cô lúc nào cũng ẩm ướt?
  Ông hiệu trưởng há hóc mồm ra.
  - Vova : Dạ là cái lưỡi.
  - Cô giáo : Cái gì của cô còn nhỏ khi cô chưa có chồng và rộng lớn ra khi cô lập gia đình?
  Ông hiệu trưởng ra dấu không cho Vova trả lời nhưng Vova đáp ngay.
  - Vova : Dạ là cái giường ngủ.
  - Cô giáo : Cái gì mềm mềm nhưng khi vào tay cô một hồi thì cứng lại?
  Ông hiệu trưởng không dám nhìn cô giáo.
  - Vova : Dạ là dầu sơn móng tay.
  - Cô giáo : Cái gì dài dài như trái chuối, cô cầm một lúc nó chảy nước ra?
  Ông hiệu trưởng gần xỉu.
  - Vova : Dạ là cây cà lem.
  Ông hiệu trưởng đổ mồ hôi hột ra dấu bảo cô giáo đừng hỏi nữa và nói với Vova :
  - Thầy cho con lên thẳng đại học vì nãy giờ thầy đáp không trúng được câu nào hết !!!

  `, `
  Chân lý.
  Một hôm Vova tới lớp cô giáo dạy học sinh về môt chân lý ” có công mài sắt có ngày nên kim”,
  Cô ví dụ: nếu chúng ta chịu khó nuôi một đàn gà thì sau này chúng ta sẽ thu được sẽ là những quả trứng thật ngon lành.

  Vova ở dưới nói với bạn bên cạnh tớ không cần nuôi gà cũng có thể thu được trứng.
  Cô giáo tức giận liền gọi Vova đứng dậy và đuổi ra ngoài, khi ra ngoài Vova vẫn cố ngoảnh lại và nói ” em sẽ nuôi một đàn vịt”…
  Cô:??!!

  `, `
  Phòng riêng của Vova.
  Bố Vôva đến đón con ở nhà trẻ, vào phòng thứ nhất có biẻn đề “học sinh ngoan” nhìn quanh không thấy Vôva đâu cả.
  Vào phòng thứ 2 “học sinh trung bình” không thấy Vôva
  Vào phòng thứ 3 “học sinh cá biệt” vẫn không thấy Vôva
  Vào phòng thứ 4 “học sinh đặc biệt hư” cũng không thấy Vôva đâu
  Bố Vôva đi đến cuối hành lang, thấy có một phòng nhỏ, biển treo bên ngoài đề “Vôva”.

  `, `
  Đi tham quan công trường

  Vừa tới nơi thì xảy ra tai nạn: một công nhân rơi từ tầng 4 ngôi nhà mới xây xuống đất. Sau buổi tham quan cô giáo tập trung học sinh lại để rút ra bài học từ trường hợp trên:
  - Theo các em, vì sao chú công nhân bị ngã?
  Masa giơ tay:
  - Thưa cô vì chú công í không tuân thủ quy tắc an toàn lao động ạ.
  - Rất có thể như vậy, ai có ý kiến khác nào?
  Kôlia:
  - Thưa cô có thể chú ấy bị cảm.
  - Cũng không loại trừ khả năng này. Thế còn Vova, em nghĩ sao?
  - Chú ấy ngã vì quát em!
  - Thế là thế nào?
  - Chú ấy bảo: thằng ôn kia, đừng có rung thang nữa!

  `, `
  Tại cô
  Cô giáo bảo Vova:
  - Em học lười thì chỉ làm khổ bố mẹ thôi.
  - Bố em lại bảo rằng, chính cô mới làm bố khổ, phải suy tư nhiều và thỉnh thoảng còn mất ngủ nữa.
  - Em không đùa đấy chứ?

  - Thoáng đỏ mặt, cô giáo hỏi lại. Em nói rõ hơn đi?
  - Vâng ạ, vì cô cho nhiều bài tập về nhà quá, bố em làm không xuể.

  `, `
  Vova học lớp 3
  Vova học lớp 3 mến một cô bạn học cùng lớp lắm mà không dám nói ra. Nhưng để lâu không chịu được, một hôm cậu đánh bạo gửi cho cô bạn một mảnh giấy ghi: “Bạn ơi, mình mến bạn lắm. Chiều nay chúng mình ra công viên cho mình nắm tay nhé”.
  Cậu tức khắc nhận được một mnh giấy tương tự từ phía cô bạn. Đáp lại sự hồi hộp của cậu, trên đó ghi:”Nếu ra công viên chỉ để nắm tay nhau thì bạn xuống lớp 2 mà học”.

  `, `
  Chỉ lấy một đồng.
  1 hôm, cô hàng xóm gọi vôva sang và hỏi:
  - vôva nếu cô cho cháu chọn giưa 10 đồng và 1 đồng, cháu lấy cái nào!
  vôva cười: -cháu lấy 1 đồng ạ!
  cô hàng xóm ngạc nhiên và đưa cho vôva 1 đồng!
  cả tháng sau ai ai cungthử vôva giống như cô hàng xóm và kháo nhau rằng :
  thằng vôva ngu lắm, cho nó chọn 10 đồng và 1 đồng nó chỉ lấy 1 đồng!
  tin đến tai mẹ vôva, bà liền nọc vôva ra đánh 1 trận rồi than:
  -trời ơi, sao tôi khổ thế này, lại có 1 thằng con chê tiền chứ, 10 đồng thì nó không
  lấy lại đi lấy 1 đồng bao giờ k0…
  vôva liền bịt miệng mẹ và nói thầm,:
  -khẽ thôi mẹ ơi, con mà lấy 10 đồng thì con chỉ được 10 đồng thôi, còn bây giờ
  con có hơn 30 đồng rồi nhé!
  `, `


  Vova học lớp 1

  Cô giáo dẫn Vova lên văn phòng ông hiệu trưởng, trình bày đầu đuôi câu chuyện. Ông hiểu trưởng bán tín bán nghi, bàn với cô giáo là ông sẽ hỏi Vova một số câu hỏi về Khoa học còn cô giáo sẽ hỏi Vova về kiến thức tổng quát, nếu Vova trả lời đúng ông sẽ cho Vova lên lớp.
  Sau gần 1 tiếng “tra tấn” Vova bằng những câu hỏi về khoa học, câu nào Vova cũng đáp đúng hết, ông hiệu trưởng rất hài lòng và giao cho cô giáo hỏi về kiến thức tổng quát.
  Cô giáo: – Con gì càng lớn càng nhỏ?
  Ông hiệu trưởng hết hồn.
  Vova: – Dạ, con cua có càng lớn và càng nhỏ.
  Cô giáo: – Cái gì trong quần em có mà cô không có?
  Ông hiệu trưởng xanh cả mặt.
  Vova: – Dạ, là 2 cái túi quần.
  Cô giáo: – Ở nơi đâu lông của đàn bà quăn nhiều nhất?
  Ông hiệu trưởng run lên.
  Vova: – Dạ ở Châu Phi.
  Cô giáo: – Cái gì cô có ở giữa 2 chân của cô?
  Ông hiệu trưởng chết điếng người.
  Vova: – Dạ là cái đầu gối.
  Cô giáo: – Cái gì trong người của cô lúc nào cũng ẩm ướt?
  Ông hiệu trưởng há hốc mồm ra.
  Vova: – Dạ là cái lưỡi.
  Cô giáo: – Cái gì của cô còn nhỏ khi cô chưa có chồng và rộng lớn ra khi cô lập gia đình?
  Ông hiệu trưởng ra dấu không cho Vova trả lời nhưng Vova đáp ngay:
  - Dạ là cái giường ngủ.
  Cô giáo: – Cái gì mềm mềm nhưng khi vào tay cô một hồi thì cứng lại?
  Ông hiệu trưởng không dám nhìn cô giáo.
  Vova: – Dạ là dầu sơn móng tay.
  Cô giáo: – Cái gì dài dài như trái chuối, cô cầm một lúc nó chảy nước ra?
  Ông hiệu trưởng gần xỉu.
  Vova: – Dạ là cây cà lem.
  Ông hiệu trưởng đổ mồ hôi hột ra dấu bảo cô giáo đừng hỏi nữa và nói với Vova:
  - Thầy cho con… lên thẳng đại học, vì nãy giờ thầy… đáp không trúng được câu nào hết!?!
  Vova: – ?!!!

  `, `
  Cái mông

  Giờ học đầu tiên môn hình học lớp 7. Cô giáo vẽ lên bảng 1 cái vòng tròn và đường kính.
  - Các em hãy nhìn đây là vòng tròn và đường kính của nó.
  Vova buộc miệng nói với bạn bên cạnh:
  - Còn theo tớ, đó là cái mông!
  Cô giáo tức quá, chạy đi tìm thầy hiệu trưởng và cùng quay về lớp học:
  - Thưa đồng chí hiệu trưởng, Vova là 1 học trò hư và không hiểu gì về hình học…
  Thầy hiệu trưởng nhìn lên bảng:
  - Hỗn láo, hỗn láo quá! Thế ai đã vẽ cái mông lên bảng thế này?!!


  Nó hình gì?
  Để hiểu học trò hơn, cô giáo bảo học sinh vẽ vào một tờ giấy mơ ước mai sau của mình. Khi cô xem, có em vẽ hình máy bay tỏ ý muốn làm phi công, em thì vẽ ống nghe muốn làm bác sĩ… Riêng Natasha để tờ giấy trắng nguyên, cô hỏi:
  - Chẳng lẽ lớn lên em không muốn làm gì cả sao?
  Natasha băn khoăn đáp:
  - Lớn lên em sẽ lấy chồng, nhưng chẳng biết nó hình gì?

  `, `
  Cuộc sống hiện đại


  Cô giáo dặn học sinh mang theo một số đồ dùng hiện đại trong gia đình đến lớp để minh hoạ cho buổi học mang tên “Cuộc sống hiện đại”. Hôm sau, trong giờ học cô giáo hỏi xem học sinh mình mang theo vật dụng gì và có thể làm gì với nó.
  Natasa: Em mang máy Sony Walkman và em có thể nghe nhạc.
  Boris: Em mang cái mở đồ hộp chạy điện và nó có thể mở hộp dễ dàng.
  Cô giáo: Vova, thế còn em mang gì đến vậy
  Vova: Em mang máy trợ tim của ông nội ạ.
  Cô giáo: Thôi chết, thế ông có mắng em không?
  Vova: Không ạ, ông chẳng có ý kiến gì đâu. Ông chỉ ặc ặc 2 tiếng thôi ạ
  `, `

  Quân đội không có phụ nữ.

  Trong giờ học môn Tự nhiên – Xã hội, cô giáo hỏi cả lớp:
  - Các em có biết tại sao trong quân đội lại không có phụ nữ?
  Cả lớp im phăng phắc, chỉ có mỗi Vova giơ tay. Cô giáo chờ một lúc đành phải mời Vô va phát biểu.
  Vova: Thưa cô, vì khi nghe khẩu lệnh “Nằm xuống“ thì phụ nữ toàn nằm ngửa ra!

  `, `
  Bác sĩ Vova.
  Lớn lên Vova đi làm bác sĩ, một hôm găp một bệnh nhân rất khó tính và không ai dám làm việc mà anh ta yêu cầu.
  Vova gặp và gọi anh ta đến bệnh viện,anh chàng bước vào bệnh viện, đòi giải phẫu cái…ấy của anh ta cho dài đụng đất và trả trước một khoản tiền lớn. Sau khi đuợc chụp thuốc mê, anh ta không còn biết gì.
  Hôm sau tỉnh lại, nhìn thấy đôi chân của mình đã bị cắt cụt tới tận bẹn, anh ta cự nự bác sĩ.
  Bác sĩ Vova từ tốn trả lời : “Anh muốn cái …ấy dài đụng đất mà, anh xem xem nó có đụng đất chưa ? “

  `, `
  Vova học giỏi.


  Vova bắt đầu đi học lớp một. Trong buổi học đầu tiên, Vova đã nói với cô giáo:
  - Thưa cô, em quá thông minh so với lớp một! Cô hãy cho em lên thẳng lớp ba!
  Cô giáo dẫn Vova lên gặp thầy hiệu trưởng, kể đầu đuôi câu chuyện.
  Thầy hiệu trưởng:
  - Được rồi, chúng ta cùng kiểm tra trình độ của Vova. Vova, 3 nhân 3 bằng mấy?
  Vova:
  - 9!
  - Đúng rồi! Thế 6×6?
  - 36!
  - Chính xác! Tôi nghĩ rằng – hiệu trưởng quay sang cô giáo – chúng ta chuyển Vova lên lớp 3!
  Cô giáo:
  - Để tôi hỏi thêm Vova về tính logic! Vova, cái gì ở con bò cái có 4 cái, còn ở cô có 2 cái?
  Vova thoáng nghĩ và trả lời:
  -Chân!
  -Hmm, Thế cái gì có trong quần của em, còn cô không có?
  Hiệu trưởng tròn mắt, thậm chí chưa kịp mở miệng thì Vova đã nói:
  - Cái túi!
  Cô giáo:
  -Đúng rồi, Vova ……. lên thẳng lớp 3!
  Hiệu trưởng:
  - Tôi nghĩ rằng có thể chuyển Vova lên thẳng lớp 5, bởi vì 2 câu hỏi cuối cùng, đến tôi thậm chí còn nhầm

  `, `
  Vova làm việc tốt.
  Vova chạy về nhà khoe với mẹ.
  - Hôm nay con đã làm được 1 việc tốt.
  - Việc gì thế con?
  - Con đã đưa 1 bà cụ già qua đường.
  - oh thật là 1 việc tốt, này mai con hãy phát huy nhé.
  Ngày hôm sau

  - Hôm nay con và các bạn cùng lớp đã làm được 35 việc tôt
  - Việc gì mà nhiều thế con???!
  - Con và các bạn đã đưa 1 bà cụ già qua đường.
  - Hôm nay sao con gặp nhiều cụ già thế?
  - Không vẫn 1 bà cụ hôm qua thôi, hôm nay con và các bạn phải vất vả lắm mới đưa được bà cụ qua đường 35 lần đấy. Bà cụ ấy già rồi mà quẫy khoẻ lắm.
  -Mẹ ?!!!

  `, `
  Vova học chữ cái.
  Cô giáo nói với học sinh:
  - Các em, hôm nay chúng ta học chữ cái “C”.
  Vova giơ thẳng tay :
  - Thưa cô em ạ!
  Cô giáo:
  - Vova ngồi im đấy! Em còn chưa mời phụ huynh tới gặp tôi vì buổi học hôm trước với chữ cái “B”.

  `, `
  Suy nghĩ của cô.

  Trong lớp học, cô giáo hỏi Vôva:
  - Vôva cho cô biết, trên cây có 10 con chim, một người thợ săn bắn chết một con, hỏi còn mấy con?
  - Dạ, tiếng súng nổ làm chim bay đi hết, làm gì còn con nao?
  - Sai, súng săn bây giờ là súng hơi, làm gì có tiếng nổ, còn 9 con. Tuy nhiên, cô rất thích kiểu suy nghĩ của em.
  - Thế em đố lại cô 1 câu có được không ạ?
  - Được.
  - Có 3 cô gái cùng ăn kem, một cô cắn từng miếng kem một, một cô ngậm và mút que kem, một cô thì để cho kem chảy vào miệng rồi nuốt, hỏi trong 3 cô ấy cô nào đã có chồng rồi?
  - Cô giáo suy nghĩ một lúc rồi đỏ mặt, bảo:
  - Vôva, em rất bậy, đi ra ngoài viết bản kiểm điểm.
  - Vôva trả lời:
  - Thưa cô, người có chồng là người tay có đeo nhẫn cưới. Tuy nhiên, em rất thích kiểu suy nghĩ của cô.

  `, `
  Giờ học sinh vật.
  Trong giờ sinh vật, cô giáo hỏi học sinh:
  - Tại sao con cá thờn bơn lại mỏng dẹt vậy?
  Vova giơ tay:
  - Thưa cô vì nó bị con cá voi hi..ếp!
  Cô giáo không kìm chế nổi:
  - Biến khỏi lớp học, và nếu không có phụ huynh thì đừng có quay lại lớp. Chúng ta tiếp tục buổi học. Thế còn ai biết, tại sao mắt của con tôm lại to và lồi ra thế không?
  Vova đã ra tới cửa:
  - Đơn giản là con tôm cũng có mặt ở cạnh đó và trông thấy tất cả.

  `, `
  Bông hồng có chân.

  Bé Vova đi học lớp 1. hôm nay cô giáo dạy vẽ và kêu mỗi bé hãy tự vẽ một bông
  hồng theo cách suy nghĩ và trí tưởng tượng của mình. Và Vova nắn nót vẽ để nộp
  bài cho cô giáo như các bạn.

  Cô gíao say sưa chấm bài, hết bài này đến bài khá, bỗng nhiên cô dừng lại và ánh
  mắt tỏ vẻ ko hài lòng. Cô kêu tên Vova lên và cô hỏi:” Cô thật bất ngờ trước bức
  tranh bông hồng của con. Hãy nói cho cô biết đã bao giờ cô dạy con vẽ bông
  hồng có chân ko?”
  Vova ngây thơ mắt ngấn lệ : thưa cô vì tối qua con nghe ba con nói với mẹ con
  rằng “bông hồng bé nhỏ của anh ơi, em hãy…….. dang hai chân ra đi!”
  `, `

  Cô nghĩ cũng được đấy
  Bé Vôva vào lớp 1. Để buổi đi học đầu tiên của các cháu được hứng thú, cô giáo bắt đầu bằng trò chơi đố vui.
  Cô nghĩ đến cái bàn, rồi đặt câu hỏi :
  - Đố các em, trong nhà ta có cái gì bằng gỗ, có 4 chân? Bé Vôva nhanh nhảu:
  - Cái ghế ạ
  Cô gật gù, ừ, cái em nghĩ cũng được đấy, nhưng mà câu trả lời của cô là cái bàn. Rồi cô đố tiếp, lần này cô nghĩ đến con mèo:
  - Đố các em, trong nhà ta nuôi con gì có 4 chân mà các em hay vuốt ve nó? Bé Vôva vẫn là người nhanh nhất:
  - Thưa cô, con chó ạ.
  - Ừ cũng được đấy, cô nói, em giỏi lắm, nhưng cái câu trả lời của cô là con mèo cơ.
  Bé Vôva xin phép cô ra câu đố:
  - Đố cô, cái gì mà đàn ông hay giấu trong quần lâu lâu lấy ra sử dụng, dài dài, tròn tròn , đầu đỏ đỏ…
  Chưa nói hết câu, cô giáo đă nổi giận ngắt ngang:
  - Vôva, sao em dám ăn nói bậy bạ như vậy
  Nước mắt lưng trong, bé Vôva thút thít trả lời:
  - Cái mà cô nghĩ cũng được đấy, nhưng câu trả lời của em là những que diêm cơ…

  `, `
  Vova thi học kỳ
  Đây là kỳ thi vấn đáp, thầy giáo hỏi:
  - Thế cậu có biết trong phòng này có mấy cái đèn không?
  Vova nhìn lên trần nhà và đếm:
  - Thưa thầy có 4 cái ạ!!!
  - Sai rồi, có 5 cái.
  Rồi thầy rút trong túi quần ra một cái bóng đèn.
  Kỳ thi sau, Vova lai vẫn gặp ông thầy nọ.
  - Vẫn câu hỏi trước đấy cậu thử trả lời xem nào!!!
  Vova thản nhiên đáp:
  - 5 cái ạ!!!
  - Cậu lại sai rồi, lần này tôi không mang theo cái bóng đèn nào!!!
  - Nhưng em có mang theo, thưa thầy!!!
  Vova rút trong túi quần ra 1 cái bóng đèn!!!

  `, `
  Chờ.


  Một sáng nọ Vôva đến lớp rất trể, cô giáo hỏi
  - mọi ngày em đều đi đúng giờ sao hôm nay đến trể vậy?
  Vôva: Dạ sáng nay có 2 chị hàng xóm nhà em cãi nhau ạ!
  cô giáo: hàng xóm cãi nhau thì mắc gì em đi trể?
  Vova: Dạ một chị đòi lột quần chị kia nên em cứ chờ mãi ạ!
  cô giáo: ????

  `, `

  Hơn mẩu socola.
  Một phái đoàn kiểm tra đến nhà trẻ. Các nhân viên phát cho mỗi em một thanh sô cô la hình cô/cậu bé. Đến lượt Vova, nhân viên hỏi:
  - Thế cháu thích hình nào
  - Hình cậu bé ạ
  - Tại sao thế?
  - Vì hình cậu bé thì cháu được thêm một mẩu mà các hình cô bé không có.

  `, `
  Papa để làm gì?
  Vova hỏi mẹ:
  - Mama, Có phải sự thật là chúng ta được chúa nuôi không?
  - Nói chung là vậy.
  - Còn trẻ con thì được sinh ra bằng rốn!.
  - Hiển nhiên.
  - Còn quà thì được ông già tuyết tặng?
  - Đúng.
  - Vậy thì chúng ta cần Papa để làm gì?!!

  `, `
  Cái lò xo.
  Trong giờ học tiếng Nga, Vôva ngồi bàn đấu cứ loáy hoáy ngó nghiêng cái bút bi, thỉnh thoảng lại bấm tách tách. Cô giáo quát:
  -Em đang làm trò gì thế Vôva? Không được mất trật tự
  - Dạ vâng, nhưng mà thưa cô, em không hiểu. Cái bút là giống cái, cái ruột bút là giống đực, thế tại sao lại không có trẻ con ở đây?
  Cô giáo đỏ mặt nói:
  - Biến ngay khỏi lớp và mời phụ huynh đến đây
  Vôva thất thểu về nhà và bảo bố
  - Cô giáo mời bố lên trường
  - Thế có chuyện gì vây?
  - Con hỏi cô ” cái bút là giống cái, cái ruột bút là giống đực, thế sao không có trẻ con ở đây? Thế là cô đuổi con ra.
  Bố Vova liên tháo tung cái bút bi, ngó nghiêng 1 hồi, bỗng thốt lên
  - Đây rồi, tất cả là tại cái này. Có 1 cái lò xo nằm ở trong đó

  `, `
  An toàn lao động

  Trong giờ học môn lao động, thầy giáo giảng cho học sinh về kỹ thuật an toàn trong lao động. Thầy giáo dẫn ví dụ:
  - Có cậu bé đang đi ngoài phố, bỗng có viên gạch rơi xuống đầu, và cậu ta chết ngay tại chỗ! Còn cô bé đội mũ bảo hiểm, cũng bịviên gịch rơi xuống đầu, nhưng cô bé chỉ mỉm cười và đi tiếp!
  Giọng Vova:
  - Vâng em biết cô ta! Cô ấy đến bây giờ vẫn đội mũ bảo hiểm và vừa đi vừa mỉm cười!
  `, `

  Vova tỏ tình.
  Vova thường ngồi chung xe bus với Natasa. Một hôm, Vova lấy hết dũng cảm dúi cho Natasa một mẩu giấy, trên đấy viết:
  “Tôi rất thích bạn, nếu bạn đồng ý kết bạn với tôi thì hãy đưa lại mẩu giấy này cho tôi, còn nếu không đồng ý thì hãy vứt nó qua cửa sổ”.
  Một lúc sau Natasa chuyển lại mẩu giấy cũ, Vova vui mừng mở ra xem, trên giấy viết:
  “cửa sổ đóng không mở được”

  `, `
  Con nít có thể có thai không
  Khi Vova đi học trường mầm non, một hôm Vova hỏi cô giáo:
  -Cô ơi, con nít có thể có thai không cô.
  Cô giáo :
  -Con nít không thể có thai được đâu con ạ !
  Vova liền chạy tới đứa bạn gái nói :
  -Đó, em không phải sợ đâu

  `, `
  Còn đau hơn
  Bố của trò Vova bị cô giáo mời đến gặp. Khắp mình dán đầy bông băng, ông vừa lê bước vào đã nghe cô kể tội con mình:
  - Bác xem này! Em Vova vẽ con ruồi lên cái đinh trên bàn giáo viên. Tôi đập một nhát, chảy cả máu tay.
  - Trời ơi! Thế là còn nhẹ. Cô nhìn cái thân tôi xem, đây là hậu quả của việc nó vẽ mẹ nó trên đống thủy tinh đấy.
  - Úi chao!

  `, `
  Vova và ông đọc truyện.
  Thấy ông nội rất chăm chú vào cuốn sách, Vô va quay sang hỏi ông : ”Ông ơi, ông đọc truyện gì thế” ?
  Ông nhẹ nhàng trả lời : ”Truyện lịch sử cháu ạ“.
  Với vẻ nghi hoặc, Vô va ngó vào quyển truyện của ông, giọng rất bức xúc : ”Ông đọc truyện xxx, thế mà ông nói dối cháu “.
  Ông lại nhẹ nhàng, vẻ mặt buồn chán : “Với cháu là truyện xxx, còn với ông, nó là lịch sử rồi cháu ạ”.

  `, `
  Kẻ ngu ngốc.


  Trong giờ học, thầy giáo:
  - Ai tự nhận thấy mình là kẻ ngu ngốc thì đứng lên!
  Cả lớp ngồi im. Sau vài phút Vova đứng lên. Thầy giáo:
  - Vova, em tự cho mình là kẻ ngu ngốc?
  - Không ạ, nhưng để thầy đứng một mình như vậy thì …..

  `, `
  Xác nhận vấn đề
  Vova thường ngồi chung xe bus với Natasa. Một hôm, Vova lấy hết dũng cảm dúi cho Natasa một mẩu giấy, trên đấy viết:
  - "Tôi rất thích bạn, nếu bạn đồng ý kết bạn với tôi thì hãy đưa lại mẩu giấy này cho tôi, còn nếu không đồng ý thì hãy vứt nó qua cửa sổ".
  - Một lúc sau Natasa chuyển lại mẩu giấy cũ, Vova vui mừng mở ra xem, trên giấy viết: "Không mở được cửa sổ!"

  `, `
  Khỉ đẹp quá.


  Vova đang đi chơi thi thấy Nana đang dắt chó đi dạo liền chạy lại và nói:
  Ôi em có con khỉ đep quá.
  Nana đáp : đây là chó mà Vova.
  Vova trả lời: tớ đang nói truyện với con chó này mà.

  `, `
  Vova thích gì?
  Trong giờ học, cô giáo:
  - Các em chú ý, hãy nhìn cô và nói xem các em thích cái gì trên người cô và cô sẽ nói cho biết lớn lên các em làm gì!
  Cô bé Masha: – thưa cô, em thích mái tóc của cô
  - Ôi Masha yêu quí, lớn lên em sẽ trở thành một thợ làm đầu nổi tiếng.
  Cậu bé Pêchia: – Thưa cô, đôi mắt của cô rất đẹp!
  - Cám ơn Pêchia, lớn lên em sẽ trở thành bác sỹ nhãn khoa giỏi. Thế còn Vôva, em nói gì đi chứ, đừng có xịu mặt như vậy.
  Vôva: – Thưa cô, em biết nói gì bây giờ? Bố mẹ em chắc sẽ buồn lắm khi biết em chỉ làm một công nhân vắt sữa bò ở nông trại…

  `, `
  Nhắc khéo…
  Trong giờ học về phép lịch sự, thầy giáo giảng: “Trong xã hội hiện đại, chúng ta luôn phải cư xử hết sức tế nhị và lịch thiệp, đặc biệt với phụ nữ”.
  - Ví dụ khi thấy váy của cô gái bị vấy bẩn thì các em nên nhắc một cách khéo léo như “trên vai cô có vết bẩn đấy”. Cô gái sẽ nhìn xuống vết bẩn trên váy mình…
  Cả lớp vẫn im phăng phắc và gần như không có phản ứng gì trước lời chỉ dạy của thầy. Trong khi đó, thấy Vova gật gù.
  - Vova! Em cho ví dụ để các bạn hiểu rõ hơn.
  Vova gãi đầu gãi tai chưa biết trả lời sao thì nhìn thấy thầy giáo quên cài khóa quần. Vova liền cho ví dụ:
  - Thưa thầy! Dây kéo trên cà-vạt của thầy bị tuột đấy ạ!

  `, `
  Ước mơ tuổi thơ
  Ước mơ tuỏi thơ:
  Na ta sa: Lớn lên em làm bác sĩ
  Pe chia: em làm phi công
  Vô va: em ước mình đầy lông
  - Sao vậy?
  - Chị em có đám lông bằng bàn tay mà nó đã kiếm được bộn tiền.

  `, `
  Vova trồng… củ cải bên trong Pijama
  Vova về già trồng được một giống củ cải cho năng suất rất cao. Ông vẫn thường tự hào rằng củ cải của mình là to nhất.
  Một hôm thằng con ông đang học trên trường Nông nghiệp của tỉnh về chơi có biếu ông bộ quần áo.
  Nó nói rằng:
  - Hôm nào nóng nực bố mặc bộ này vào sẽ thấy rất mát. Người ta gọi là bộ Pijama.
  Một tối thấy trời nóng quá ông mới đem ra mặc rồi dạo chơi trong vườn củ cải của mình thì thấy thật là mát mẻ trong lòng khoan khoái vô cùng bèn đặt tên cho vườn củ cải của mình là Pijama.
  Thời gian sau một hôm nhớ con ông lão khăn gói lên trường tìm.
  Khi đi ngang qua một lớp nghe thấy tiếng cô giáo đang giảng về một giống củ cải rất to ông vội chạy vào và kêu lên:
  - Củ cải này chưa to, củ cải trong Pijama của tôi còn to hơn nhiều!
  - ?!

  `, `
  Chạy nước gì….?

  Trong giờ sinh vật giảng về con ngựa.
  Cô giáo: con ngựa chạy nhanh thì gọi là gì?
  Vova: thưa cô nuớc đại ạ.
  Cô giáo:thế con ngựa chạy chậm thì gọi là gì?
  Vova: thưa cô nước….tiểu ạ

  `,
    `
  Vova trông em.


  Vova phải trông em cho bố mẹ đi xuống phố mua sắm, cậu đành phải cho em theo đi câu cá. Tối hôm đó, cậu dằn dỗi với mẹ:
  - Từ nay con không cho em đi câu nữa đâu. Chỉ mất công, chả được con cá nào!
  - Ồ! Nó quấy khóc làm cá sợ phải không? Lần sau em sẽ quen, thôi không khóc nữa.
  - Không phải thế! Em đã ăn hết mồi câu của con.
  ];
  `
];
class MyBot {
    /**
     *
     * @param {UserState} User state to persist boolean flag to indicate
     *                    if the bot had already welcomed the user
     */
    constructor(userState) {
        // Creates a new user property accessor.
        // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors.
        this.welcomedUserProperty = userState.createProperty(WELCOMED_USER);

        this.userState = userState;
    }
    /**
     *
     * @param {TurnContext} context on turn context object.
     */
    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
            // Read UserState. If the 'DidBotWelcomedUser' does not exist (first time ever for a user)
            // set the default to false.
            const didBotWelcomedUser = await this.welcomedUserProperty.get(turnContext, false);

            // Your bot should proactively send a welcome message to a personal chat the first time
            // (and only the first time) a user initiates a personal chat with your bot.
            if (didBotWelcomedUser === false) {
                // The channel should send the user name in the 'From' object
                let userName = turnContext.activity.from.name;
                await turnContext.sendActivity('Không ai nói gì à :v');
                // await turnContext.sendActivity(`It is a good practice to welcome the user and provide personal greeting. For example, welcome ${ userName }.`);

                // Set the flag indicating the bot handled the user's first message.
                await this.welcomedUserProperty.set(turnContext, true);
            } else {
                // This example uses an exact match on user's input utterance.
                // Consider using LUIS or QnA for Natural Language Processing.
                let text = turnContext.activity.text.toLowerCase();
                switch (text) {
                case 'hello':
                    await turnContext.sendActivity(`Chào em :) ${ text }`);
                    break;
                case text.includes('kèo'):
                    await turnContext.sendActivity(`Huỷ kèo đê :))`);
                    break;
                default :
                    if (text.substring(0, 7) == 'nhơn :v') {
                        if (text.includes('kèo')) {
                            var responseText = `Huỷ kèo đê :))`;
                        } else if (text.includes('dmm') || text.includes('đmm') || text.includes('dm') || text.includes('đm') || text.includes('địt')) {
                            var responseText = bichui[Math.floor(Math.random() * bichui.length)];
                        } else if (text.includes('ơi')) {
                            var responseText = `Dạ :v`;
                        } else if (text.includes('thằng nào') || text.includes('đứa nào') || text.includes('là ai')) {
                            var responseText = `Em là nhơn ạ :v`;
                        } else if (text.includes('nói')) {
                            var responseText = deadGroup[Math.floor(Math.random() * deadGroup.length)];
                        } else {
                            var responseText = text.substring(8) + ' con củ kẹc (xd)';
                        }
                    } else {
                        responseText = text;
                    }

                    await turnContext.sendActivity(`${ responseText }`);
                }
            }
            // Save state changes
            await this.userState.saveChanges(turnContext);
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate) {
            // Send greeting when users are added to the conversation.
            await this.sendWelcomeMessage(turnContext);
        } else {
            // Generic message for all other activities
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }

    /**
     * Sends welcome messages to conversation members when they join the conversation.
     * Messages are only sent to conversation members who aren't the bot.
     * @param {TurnContext} turnContext
     */
    async sendWelcomeMessage(turnContext) {
        // Do we have any new members added to the conversation?
        if (turnContext.activity.membersAdded.length !== 0) {
            // Iterate over all new members added to the conversation
            for (let idx in turnContext.activity.membersAdded) {
                // Greet anyone that was not the target (recipient) of this message.
                // Since the bot is the recipient for events from the channel,
                // context.activity.membersAdded === context.activity.recipient.Id indicates the
                // bot was added to the conversation, and the opposite indicates this is a user.
                if (turnContext.activity.membersAdded[idx].id !== turnContext.activity.recipient.id) {
                    await turnContext.sendActivity(`Hello :))`);
                    await turnContext.sendActivity('Chào mừng đến với chùa cụ tổ bà đanh (xd)');
                    await turnContext.sendActivity(swears[Math.floor(Math.random() * swears.length)]);
                }
            }
        }
    }
}

module.exports.MyBot = MyBot;

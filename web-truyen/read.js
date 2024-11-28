// Lấy tên câu chuyện từ URL
const urlParams = new URLSearchParams(window.location.search);
const storyName = urlParams.get('story');

// Tìm câu chuyện trong danh sách
const story = getStoryByName(storyName);  // Hàm getStoryByName đã có trong mã trước

if (story) {
    // Hiển thị thông tin câu chuyện
    document.getElementById("story-thumbnail").innerHTML = story.renderThumbnail();
    document.getElementById("story-title").innerText = story.name;
    document.getElementById("story-genre").innerText = `Thể loại: ${story.genre}`;
    document.getElementById("story-status").innerText = ` ${story.status ? "Completed" : "Ongoing"}`;
    document.getElementById("story-chapters").innerText = `Tập mới nhất: ${story.chapters.length}`;

    // Nếu có các chương, bạn có thể tạo một danh sách các chương để hiển thị
    const chaptersList = story.chapters.map(chap => {
        return `<li><strong>Chapter ${chap.number}: </strong>${chap.title}</li>`;
    }).join('');

    // Thêm các chương vào DOM
    const chaptersContainer = document.createElement('ul');
    chaptersContainer.innerHTML = chaptersList;
    document.body.appendChild(chaptersContainer);

} else {
    console.log("Story not found");
    // Hiển thị thông báo không tìm thấy câu chuyện nếu không tìm thấy
    document.getElementById("story-title").innerText = "Story not found";
}

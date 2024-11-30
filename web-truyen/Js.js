// function renderStoryList(storiesList) {
//     const storyContainer = document.getElementById("story-container");
//     storyContainer.innerHTML = "";
//
//     storiesList.forEach(story => {
//         const storyCard = `
//             <div class="story-card">
//                 ${story.renderThumbnail()}
//                 <div class="story-info">
//                     <h3 class="story-name">${story.name}</h3>
//                     <p class="story-genre">Genre: ${story.genre || "Unknown"}</p>
//                     <p class="story-status">Status: ${story.status ? "Completed" : "Ongoing"}</p>
//                     <p class="story-chapters">Chapters: ${story.chapters.length}</p>
//                 </div>
//                 <button type="button" onclick="readStory('${story.name}')">Đọc truyện</button>
//             </div>
//         `;
//         storyContainer.innerHTML += storyCard;
//     });
// }
function renderStoryList(storiesList) {
    const storyContainer = document.getElementById("story-container");
    storyContainer.innerHTML = ""; // Xóa nội dung cũ trước khi render

    // Kiểm tra nếu danh sách truyện rỗng
    if (storiesList.length === 0) {
        storyContainer.innerHTML = "<p>Không có truyện nào để hiển thị.</p>";
        return;
    }

    storiesList.forEach(story => {
        // Tạo div cho mỗi story
        const storyDiv = document.createElement("div");
        storyDiv.className = "story-card";

        // Thêm thumbnail
        storyDiv.innerHTML = story.renderThumbnail();

        // Tạo div cho thông tin truyện
        const storyInfoDiv = document.createElement("div");
        storyInfoDiv.className = "story-info";

        // Thêm các phần tử thông tin truyện
        const storyName = document.createElement("h3");
        storyName.className = "story-name";
        storyName.textContent = story.name;
        storyInfoDiv.appendChild(storyName);

        const storyGenre = document.createElement("p");
        storyGenre.className = "story-genre";
        storyGenre.textContent = `Genre: ${story.genre || "Unknown"}`;
        storyInfoDiv.appendChild(storyGenre);

        const storyStatus = document.createElement("p");
        storyStatus.className = "story-status";
        storyStatus.textContent = `Status: ${story.status ? "Completed" : "Ongoing"}`;
        storyInfoDiv.appendChild(storyStatus);

        const storyChapters = document.createElement("p");
        storyChapters.className = "story-chapters";
        storyChapters.textContent = `Chapters: ${story.chapters.length}`;
        storyInfoDiv.appendChild(storyChapters);

        // Thêm storyInfoDiv vào storyDiv
        storyDiv.appendChild(storyInfoDiv);

        // Tạo nút "Đọc truyện"
        const readButton = document.createElement("button");
        readButton.type = "button";
        readButton.textContent = "Đọc truyện";
        readButton.classList.add("read-button"); // Thêm dòng này
        readButton.onclick = () => readStory(story.name);
        storyDiv.appendChild(readButton);

        // Thêm storyDiv vào storyContainer
        storyContainer.appendChild(storyDiv);
    });
}
renderStoryList(storiesList);
function getStoryByName(name) {
    return storiesList.find(story => story.name === name);
}
function readStory(name) {
    const story = getStoryByName(name); // Sử dụng hàm getStoryByName để lấy thông tin truyện

    if (story) {
        // Chuyển đến trang đọc truyện và truyền thông tin câu chuyện vào URL
        window.location.href = `read-story.html?story=${encodeURIComponent(story.name)}`;
    } else {
        console.log("Story not found");
    }
}
function searchStories() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredStories = storiesList.filter(story =>
        story.name.toLowerCase().includes(query)
    );

    if (filteredStories.length > 0) {
        renderStoryList(filteredStories); // Hiển thị danh sách truyện phù hợp
    } else {
        document.getElementById("story-container").innerHTML = "<p>Không tìm thấy truyện phù hợp.</p>";
    }
}
function filterStoriesByGenre() {
    const genre = document.getElementById("genre-filter").value;
    let filteredStories;

    if (genre === "all") {
        filteredStories = storiesList; // Hiển thị tất cả truyện
    } else {
        filteredStories = storiesList.filter(story => story.genre === genre);
    }

    renderStoryList(filteredStories); // Gọi hàm render để cập nhật danh sách truyện
}
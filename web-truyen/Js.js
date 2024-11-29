function renderStoryList(storiesList) {
    const storyContainer = document.getElementById("story-container");
    storyContainer.innerHTML = "";

    storiesList.forEach(story => {
        const storyCard = `
            <div class="story-card">
                ${story.renderThumbnail()}
                <div class="story-info">
                    <h3 class="story-name">${story.name}</h3>
                    <p class="story-genre">Genre: ${story.genre || "Unknown"}</p>
                    <p class="story-status">Status: ${story.status ? "Completed" : "Ongoing"}</p>
                    <p class="story-chapters">Chapters: ${story.chapters.length}</p>
                </div>
                <button type="button" onclick="readStory('${story.name}')">Đọc truyện</button>
            </div>
        `;
        storyContainer.innerHTML += storyCard;
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
// Lấy thông tin từ URL
const urlParams = new URLSearchParams(window.location.search);
const storyName = urlParams.get('story');
const chapterNumber = parseInt(urlParams.get('chapter'));

// Hàm tìm câu chuyện từ danh sách (sử dụng mã đã có trước đó)
function getStoryByName(name) {
    return storiesList.find(story => story.name === name);
}

// Lấy câu chuyện từ danh sách
const story = getStoryByName(storyName);

if (story) {
    if (chapterNumber) {
        // Xử lý logic cho trang `read-chapter.html`
        const chapter = story.getChapterByNumber(chapterNumber);
        if (chapter) {
            document.getElementById("story-title").innerText = `Story: ${story.name}`;
            document.getElementById("chapter-title").innerText = `Chapter ${chapter.number}: ${chapter.title}`;
            document.getElementById("chapter-content").innerText = chapter.content;
            // Tạo nút chuyển đến chương trước và chương sau
            const prevChapter = story.getChapterByNumber(chapterNumber - 1);
            const nextChapter = story.getChapterByNumber(chapterNumber + 1);

            const navHtml = `
                <div class="chapter-navigation">
                    ${prevChapter ? `<a href="read-chapter.html?story=${encodeURIComponent(story.name)}&chapter=${prevChapter.number}" class="prev-chapter">Chương trước</a>` : ''}
                    ${nextChapter ? `<a href="read-chapter.html?story=${encodeURIComponent(story.name)}&chapter=${nextChapter.number}" class="next-chapter">Chương sau</a>` : ''}
                </div>
            `;

            // Thêm các nút vào trang
            document.getElementById("chapter-navigation").innerHTML = navHtml;
            // danh sách
            const chaptersList = story.chapters.map(chap => {
                return `<li><a href="read-chapter.html?story=${encodeURIComponent(story.name)}&chapter=${chap.number}">Chapter ${chap.number}: ${chap.title}</a></li>`;
            }).join('');

            const chaptersContainer = document.createElement('ul');
            chaptersContainer.innerHTML = chaptersList;
            document.getElementById("chapter-list").appendChild(chaptersContainer);
        }
    } else {
        // Xử lý logic cho trang `read-story.html`
        document.getElementById("story-title").innerText = story.name;
        document.getElementById("story-thumbnail").innerHTML = story.renderThumbnail();
        document.getElementById("story-genre").innerText = `Thể loại: ${story.genre}`;
        document.getElementById("story-status").innerText = `Trạng thái: ${story.status ? "Completed" : "Ongoing"}`;
        document.getElementById("chapter-list").innerText = `Số chương: ${story.chapters.length}`;

        // Tạo danh sách chương
        const chaptersList = story.chapters.map(chap => {
            return `<li><a href="read-chapter.html?story=${encodeURIComponent(story.name)}&chapter=${chap.number}">Chapter ${chap.number}: ${chap.title}</a></li>`;
        }).join('');

        // Thêm danh sách chương vào DOM
        const chaptersContainer = document.createElement('ul');
        chaptersContainer.innerHTML = chaptersList;
        document.body.appendChild(chaptersContainer);
    }
}

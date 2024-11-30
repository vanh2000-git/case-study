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
            // Tạo danh sách chương
            const chaptersListHTML = story.chapters.map(chap => {
                return `<li><a href="read-chapter.html?story=${encodeURIComponent(story.name)}&chapter=${chap.number}">Chapter ${chap.number}: ${chap.title}</a></li>`;
            }).join("");

// Thêm danh sách chương vào DOM
            const chapterListElement = document.getElementById("chapter-list");
            if (chapterListElement) {
                const ulElement = document.createElement("ul");
                ulElement.innerHTML = chaptersListHTML;
                chapterListElement.appendChild(ulElement);
            }
        }
    } else {
        // Xử lý logic cho trang `read-story.html`
        document.getElementById("story-title").innerText = story.name;
        document.getElementById("story-thumbnail").innerHTML = story.renderThumbnail();
        document.getElementById("story-genre").innerText = `Thể loại: ${story.genre}`;
        document.getElementById("story-status").innerText = `Trạng thái: ${story.status ? "Completed" : "Ongoing"}`;
        document.getElementById("chapter-length").innerText = `Số chương: ${story.chapters.length}`;
        renderChapterList(getStoryByName(storyName),"chapter-list");
//         // Tạo danh sách chương
//         const chaptersListHTML = story.chapters.map(chap => {
//             return `<li><a href="read-chapter.html?story=${encodeURIComponent(story.name)}&chapter=${chap.number}">Chapter ${chap.number}: ${chap.title}</a></li>`;
//         }).join("");
//
// // Thêm danh sách chương vào DOM
//         const chapterListElement = document.getElementById("chapter-list");
//         if (chapterListElement) {
//             const ulElement = document.createElement("ul");
//             ulElement.innerHTML = chaptersListHTML;
//             chapterListElement.appendChild(ulElement);
//         }
//     }
// }
        function renderChapterList(story, containerId) {
            const chapterListElement = document.getElementById(containerId);
            if (!chapterListElement) {
                console.warn(`Không tìm thấy phần tử với ID: ${containerId}`);
                return;
            }
            if (!story.chapters || story.chapters.length === 0) {
                chapterListElement.innerHTML = "<p>Không có chương nào để hiển thị.</p>";
                return;
            }

            const fragment = document.createDocumentFragment();
            story.chapters.forEach(chap => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="read-chapter.html?story=${encodeURIComponent(story.name)}&chapter=${chap.number}">
                Chapter ${chap.number}: ${chap.title}
            </a>
        `;
                fragment.appendChild(listItem);
            });
            chapterListElement.innerHTML = ""; // Xóa nội dung cũ
            chapterListElement.appendChild(fragment);
        }
        function renderChapterList(story, containerId) {
            const chapterListElement = document.getElementById(containerId);
            if (!chapterListElement) {
                console.warn(`Không tìm thấy phần tử với ID: ${containerId}`);
                return;
            }
            if (!story.chapters || story.chapters.length === 0) {
                chapterListElement.innerHTML = "<p>Không có chương nào để hiển thị.</p>";
                return;
            }

            // Tạo thẻ ul
            const ulElement = document.createElement("ul");

            story.chapters.forEach(chap => {
                const listItem = document.createElement("li");

                // Tạo thẻ a
                const link = document.createElement("a");
                link.href = `read-chapter.html?story=${encodeURIComponent(story.name)}&chapter=${chap.number}`;
                link.textContent = `Chapter ${chap.number}: ${chap.title}`;

                // Thêm thẻ a vào li
                listItem.appendChild(link);

                // Thêm li vào ul
                ulElement.appendChild(listItem);
            });

            // Xóa nội dung cũ và thêm ul vào div#chapter-list
            chapterListElement.innerHTML = "";
            chapterListElement.appendChild(ulElement);
        }

    }
}
((doc) => {
    const pageContainer = doc.getElementById('new-main');
    const pageList = doc.querySelector('.pagination-list');
    let newsDataRender = [];
    let showPageNumber = 18;
    let page = Math.ceil(364 / 18);

    // const getData = fetch('/shiji_project/json/shiji.json', { method: 'GET' })
    //     .then((oneData) => oneData.json())
    //     .then((finallData) => {
    //         finall(finallData);
    //     });

    //[]

    async function getData() {
        const shijiUrl = await fetch('/shiji_project/json/shiji.json');
        const shijiData = await shijiUrl.json();
    }

    function render(oldData) {
        pageContainer.innerHTML = ' ';
        newsDataRender = oldData.splice(0, showPageNumber); //0-18
        newsDataRender.forEach((item, index) => {
            pageContainer.innerHTML += `<div class="author-container" id="author-container">
                <h2 class="author-name">${item.author}${index + 1}</h2>
                <span class="poetry-name">${item.title}</span>
                <article class="article">${item.paragraphs}</article>
            </div>`;
        });
    }

    function renderPagination(pageCount) {
        for (let i = 0; i < pageCount; i++) {
            pageList.innerHTML += `<li class="page-item">${i + 1}</li>`;
        }
        pageList.innerHTML += `<span class="skip">跳轉至 <input type="text" class="page-number"></span>頁`;
        const pageListItem = pageList.querySelectorAll('.page-item');

        pageListItem[0].classList.add('active');

        pageListItem.forEach((item, index) => {
            item.addEventListener('click', () => {
                for (let val = 0; val < pageListItem.length; val++) {
                    pageListItem[val].classList.remove('active');
                }
                pageListItem[index].classList.add('active');
                showPageNumber = index + 1;
            });
        });
    }
    getData();
    console.log(newsDataRender);
})(document);

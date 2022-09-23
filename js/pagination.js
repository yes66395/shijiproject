((doc) => {
    const pageContainer = doc.getElementById('new-main');
    const pageList = doc.querySelector('.pagination-list');
    const search = doc.getElementById('searchData');
    let Data = [];
    fetch('./json/shiji.json', {
        method: 'GET',
    })
        .then((oneData) => {
            return oneData.json();
        })
        .then((finallData) => {
            finall(finallData);
        })
        .catch((err) => {
            console.error(err);
        });

    function finall(data) {
        const newData = data.filter((item) => {
            if (item.title !== '長恨歌' && item.title !== '韓碑') {
                Data.push(item);
                return item;
            }
        });
        pagination(newData, 1);
    }

    function pagination(getdata, nowPage) {
        const dataTotal = getdata.length;
        let initPage = 25;
        let pageTotal = Math.ceil(dataTotal / initPage);
        let currentPage = nowPage;
        if (currentPage > pageTotal) {
            currentPage = pageTotal;
        }
        let minData = currentPage * initPage - initPage + 1;
        let maxData = currentPage * initPage;
        const dataArray = [];
        getdata.forEach((item, index) => {
            let num = index + 1;
            if (num >= minData && num <= maxData) {
                dataArray.push(item);
            }
        });

        const page = {
            pageTotal,
            currentPage,
            hasPage: currentPage > 1,
            hasNext: currentPage < pageTotal,
        };

        pageContainer.innerHTML = displayData(dataArray);
        pageList.innerHTML = pageBtn(page);
    }

    function displayData(data) {
        let str = '';
        data.forEach((item, index) => {
            str += `<div class="author-container" id="author-container">
                <h2 class="author-name">${item.author}${index + 1}</h2>
                <span class="poetry-name">${item.title}</span>
                <article class="article">${item.paragraphs}</article>
            </div>`;
        });

        return str;
    }

    function pageBtn(page) {
        let str = '';
        let total = page.pageTotal;
        if (page.hasPage) {
            str += `<li class="page-item" ><a class="page-link" href="#" data-page="${
                Number(page.currentPage) - 1
            }">Previous</a></li>`;
        } else {
            str += `<li class="page-item disabled" disable="false" ><span class="page-link">Previous</span></li>`;
        }

        for (let i = 1; i <= total; i++) {
            if (Number(page.currentPage) === i) {
                str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            } else {
                str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            }
        }
        if (page.hasNext) {
            str += `<li class="page-item disabled"><a class="page-link" href="#" data-page="${
                Number(page.currentPage) + 1
            }">Next</a></li>`;
        } else {
            str += `<li class="page-item " disable="false"><span class="page-link">Next</span></li>`;
        }

        return str;
    }

    function switchPage(e) {
        e.preventDefault();
        const tar = e.target;
        if (e.target.nodeName.toLowerCase() !== 'a') return;
        const page = tar.dataset.page;
        pagination(Data, page);
    }
    function searchData(data, keyword) {
        const searchFinallyData = data.reduce((prev, item) => {
            let result = item.title.includes(keyword) || item.author.includes(keyword);
            if (result) {
                prev.push(item);
            }
            return prev;
        }, []);
        return searchFinallyData;
    }

    function searchPaper() {
        const val = search.value.trim();
        let valLen = val.length;
        if (valLen > 0) {
            let oData = searchData(Data, val);
            if (oData && oData.length > 0) {
                pageContainer.innerHTML = displayData(searchData(Data, val));
            }
        } else {
            pageContainer.innerHTML = restore(Data);
        }
    }
    //重新渲染回到第一筆資料與第18
    function restore(data) {
        let resultData = data.slice(0, 18);
        let str = '';
        resultData.forEach((item, index) => {
            str += `<div class="author-container" id="author-container">
                <h2 class="author-name">${item.author}${index + 1}</h2>
                <span class="poetry-name">${item.title}</span>
                <article class="article">${item.paragraphs}</article>
            </div>`;
        });
        return str;
    }
    function bindEvent() {
        search.addEventListener('input', searchPaper, false);
        pageList.addEventListener('click', switchPage, false);
    }
    const init = () => {
        bindEvent();
    };
    init();
})(document);

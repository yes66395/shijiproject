//寫太爛 我會在回來修改 //改完//看還可不可以利用generator改進

const init = ((doc) => {
    'use strict';
    const descNav = doc.querySelector('.desc-nav');
    const descNavItem = descNav.querySelectorAll('.desc-nav .nav-item');
    const descNavItemLen = descNavItem.length;
    const navItemDes = doc.querySelectorAll('.nav-item-describe');
    const loadBox = document.querySelector('.load-box');
    const loadAnimation = loadBox.querySelector('.loader');
    const menuControl = document.querySelector('.nav-control');

    doc.addEventListener('DOMContentLoaded', LoadAnimation('load', 1000), false);

    eventListener(menuControl, 'touchstart', (e) => {
        e.stopPropagation();
        descNav.classList.toggle('block');
    });
    

    function LoadAnimation(classname, delay) {
        setTimeout(() => {
            loadBox.classList.add(classname);
            loadAnimation.classList.add(classname);
            navItemDes.forEach((item) => {
                item.classList.add('active');
            });
        }, delay);
    }

    descNav.addEventListener(
        'click',
        (e) => {
            Test(e).next();
        },
        false,
    );

    function* Test(e) {
        const tar = e.target;
        const tagname = tar.tagName.toLowerCase();
        if (tagname === 'ol') {
            return false;
        }
        const target = doc.querySelector(tar.dataset.tabClick);

        for (let i of descNavItem) {
            i.classList.remove('click');
        }
        for (let val of navItemDes) {
            val.classList.remove('show');
        }

        yield [target.classList.add('show'), tar.classList.add('click')];
    }

    function eventListener(el, event, fn) {
        return el.addEventListener(event, fn, false);
    }
})(document);

import tpl0 from './tpl/item0.tpl';
import tpl1 from './tpl/item1.tpl';
import tpl2 from './tpl/item2.tpl';
import tpl3 from './tpl/item3.tpl';
import listTpl from './tpl/index.tpl';
import './index.scss';

import { getItemNode, tplReplace } from '../../libs/utils';

export default {
    name: 'NewsList',
    listTpl(top) {
        return tplReplace(listTpl, {
            top
        });
    },
    tpl(options) {
        const { data, pageNum } = options;
        let list = '',
            tpl = '';
        
        data.map((item, index) => {
            if (!item.thumbnail_pic_s) {
                tpl = tpl0;
            } else if (item.thumbnail_pic_s && !item.thumbnail_pic_s02) {
                tpl = tpl1;
            } else if (item.thumbnail_pic_s02 && !item.thumbnail_pic_s03) {
                tpl = tpl2;
            } else if (item.thumbnail_pic_s03) {
                tpl = tpl3;
            }

            list += tplReplace(tpl, {
                pageNum,
                index,
                uniquekey: item.uniquekey,
                title: item.title,
                category: item.category,
                url: item.url,
                author: item.author_name,
                date: item.date,
                thumbnail_pic_s: item.thumbnail_pic_s,
                thumbnail_pic_s02: item.thumbnail_pic_s02,
                thumbnail_pic_s03: item.thumbnail_pic_s03
            });
        });

        return list;
    },
    imgShow() {
        const oImgs = document.querySelectorAll('img');
        [...oImgs].map((img) => {
            img.onload = function() {
                img.style.opacity = '1';
            }
        })
    },
    bindEvent(oList, setCurrentNews) {
        oList.addEventListener('click', this._goToDetail.bind(this, setCurrentNews), false);
    },
    _goToDetail(setCurrentNews) {
        const oItem = getItemNode(arguments[1].target);

        const options = {
            index: oItem.dataset.index,
            pageNum: oItem.dataset.page
        }

        setCurrentNews(options);

        window.location.href = `detail.html?path=${location.pathname}`;
    }
}
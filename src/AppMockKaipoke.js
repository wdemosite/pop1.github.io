console.log("MockApp.js: loaded");
import { element, insertRender, appendRender } from "./view/html-util.js";

export class AppMockKaipoke {
    constructor() {
        // localstrageからデータを取得
        var data = localStorage.getItem('twoTableData');
        this.twoTableData = data ? JSON.parse(data) : '';
        this.baseRow = 2;
        this.itemNeeds = 0;
        this.itemLong = 0;
        this.itemShort = 0;
        this.itemServiceDesc = 0;
        this.itemServiceKind = 0;
        this.itemServiceCorp = 0;
    }
    mount() {
        // データがない場合は何もしない
        if (!this.twoTableData) return;

        let ftdElement = document.querySelector("#fw-td");
        this.twoTableData.forEach((item) => {
            if (item.name == 'ニーズ') {
                let td = document.getElementsByClassName('needa');
                ftdElement = td.length ? td[td.length - 1] : ftdElement;
                this.writeNeeds(ftdElement, item);
                this.itemNeeds++;
                ftdElement = ftdElement.nextElementSibling;
            }
            if (item.name == '長期目標') {
                let td = document.getElementsByClassName('olong');
                ftdElement = td.length ? td[td.length - 1] : ftdElement;
                this.writeLong(ftdElement, item);
                this.itemLong++;
                ftdElement = ftdElement.nextElementSibling.nextElementSibling;
            }
            if (item.name == '短期目標') {
                let td = document.getElementsByClassName('oshort');
                ftdElement = td.length ? td[td.length - 1] : ftdElement;
                this.writeShort(ftdElement, item);
                this.itemShort++;
                ftdElement = ftdElement.nextElementSibling.nextElementSibling;
            }
            if (item.name == 'サービス内容') {
                let td = document.getElementsByClassName('service-desc');
                ftdElement = td.length ? td[td.length - 1] : ftdElement;
                this.writeServiceDesc(ftdElement, item);
                ftdElement = ftdElement.nextElementSibling;
                this.itemServiceDesc++;
            }
            if (item.name == 'サービス種別') {
                let td = document.getElementsByClassName('service-kind');
                ftdElement = td.length ? td[td.length - 1] : ftdElement;
                this.writeServiceKind(ftdElement, item);
                ftdElement = ftdElement.nextElementSibling.nextElementSibling;
                this.itemServiceKind++;
            }
            if (item.name == 'サービス事業所') {
                let td = document.getElementsByClassName('service-corp');
                ftdElement = td.length ? td[td.length - 1] : ftdElement;
                this.writeServiceCorp(ftdElement, item);
                this.itemServiceCorp++;
            }

        })
    }
    writeNeeds(targetEl, item) {
        // 親ノード
        let parentEl = targetEl.parentNode;
        // 値の設定
        targetEl.innerHTML = item.value;
        let next = targetEl.nextElementSibling;
        // セルを縦に結合
        targetEl.rowSpan = 1;
        // ニーズの追加項目
        const addNeedsElement = element `<tr><td class="class">&nbsp;</td><td rowspan="1" class="needa"><a href="add01_need.html">+ 項目を追加</a></td><td class="data_gr_bottom" colspan="9">&nbsp;</td><td class="data_gr_corner">&nbsp;</td></tr>`;
        appendRender(addNeedsElement, document.querySelector("#t-body"));
        // 長期のa追加
        const addTdLongElement = element `<td colspan="2" rowspan="1" class="olong"><a href="add02_long.html">+ 項目を追加</a></td>`;
        insertRender(addTdLongElement, parentEl, next);
        // 後ろの横結合を変更
        next.colSpan = 7;
    }

    writeLong(targetEl, item) {
        // 親ノード
        let parentEl = targetEl.parentNode;
        // 値の設定
        targetEl.innerHTML = item.value;
        targetEl.colSpan = 1;
        // 長期の期間設定
        let next = targetEl.nextElementSibling;
        const kikanNode = element `<td rowspan="1">${item.kikan}</td>`;
        insertRender(kikanNode, parentEl, next);

        // 短期のa追加
        const addTdLongElement = element `<td colspan="2" rowspan="1" class="oshort"><a href="add03_short.html">+ 項目を追加</a></td>`;
        insertRender(addTdLongElement, targetEl.parentNode, next);

        // 長期の追加項目
        const addNeedsElement = element `<tr><td class="data">&nbsp;</td><td colSpan="2" rowspan="1" class="olong"><a href="add02_long.html">+ 項目を追加</a></td><td class="data_gr_bottom" colspan="7">&nbsp;</td><td class="data_gr_corner">&nbsp;</td></tr>`;
        parentEl = document.querySelector("#t-body");
        let lastChild = parentEl.lastElementChild;
        insertRender(addNeedsElement, parentEl, lastChild);

        // 後ろの横結合を変更（固定）
        next.colSpan = 5;

        // ニーズの縦結合
        let tgtEl = document.getElementsByClassName('needa');
        tgtEl = tgtEl[tgtEl.length - 2];
        tgtEl.rowSpan += 1;
    }

    writeShort(targetEl, item) {
        // 親ノード
        let parentEl = targetEl.parentNode;
        // 値の設定
        targetEl.innerHTML = item.value;
        targetEl.colSpan = 1;
        // 短期の期間設定
        let next = targetEl.nextElementSibling;
        const kikanNode = element `<td rowspan="1">${item.kikan}</td>`;
        insertRender(kikanNode, parentEl, next);
        // サービス内容のa追加
        const addTdLongElement = element `<td rowspan="1" class="service-desc"><a href="add04_desc.html">+ 項目を追加</a></td>`;
        insertRender(addTdLongElement, parentEl, next);
        // 後ろの横結合を変更（固定）
        next.colSpan = 4;
        // 短期の追加項目
        const addNeedsElement = element `<tr><td class="data">&nbsp;</td><td colSpan="2" rowspan="1" class="oshort"><a href="add03_short.html">+ 項目を追加</a></td><td class="data_gr_bottom" colspan="5">&nbsp;</td><td class="data_gr_corner">&nbsp;</td></tr>`;
        parentEl = document.querySelector("#t-body");
        let lastChild = parentEl.lastElementChild.previousSibling;
        insertRender(addNeedsElement, parentEl, lastChild);
        // 縦結合
        // ニーズ
        let tgtEl = document.getElementsByClassName('needa');
        tgtEl = tgtEl[tgtEl.length - 2];
        tgtEl.rowSpan += 1;
        // 長期
        let td = document.querySelectorAll('.olong');
        if (td.length > 1) {
            let longTd = td[td.length - 2];
            longTd.rowSpan += 1;
            longTd.nextElementSibling.rowSpan += 1
        } else {
            tgtEl.nextElementSibling.rowSpan += 1;
            tgtEl.nextElementSibling.nextElementSibling.rowSpan += 1;
        }

    }

    writeServiceDesc(targetEl, item) {
        // 親ノード
        let parentEl = targetEl.parentNode;
        // 値の設定
        targetEl.innerHTML = item.value;
        // サービス種別のa追加
        const addTdLongElement = element `<td colSpan="2" rowspan="1" class="service-kind"><a href="add05_kind.html">+ 項目を追加</a></td>`;
        let next = targetEl.nextElementSibling;
        insertRender(addTdLongElement, parentEl, next);
        // 後ろの横結合を変更（固定）
        next.colSpan = 2;
        // サービス内容の追加項目
        const addNeedsElement = element `<tr><td class="data">&nbsp;</td><td rowspan="1" class="service-desc"><a href="add04_desc.html">+ 項目を追加</a></td><td class="data_gr_bottom" colspan="4">&nbsp;</td><td class="data_gr_corner">&nbsp;</td></tr>`;
        parentEl = document.querySelector("#t-body");
        let lastChild = parentEl.lastElementChild.previousSibling.previousSibling;
        insertRender(addNeedsElement, parentEl, lastChild);
        //
        // 縦結合
        // ニーズ
        let tgtEl = document.getElementsByClassName('needa');
        tgtEl = tgtEl[tgtEl.length - 2];
        tgtEl.rowSpan += 1;
        // 長期
        let td = document.querySelectorAll('.olong');
        if (td.length > 1) {
            let longTd = td[td.length - 2];
            longTd.rowSpan += 1;
            longTd.nextElementSibling.rowSpan += 1
        } else {
            tgtEl.nextElementSibling.rowSpan += 1;
            tgtEl.nextElementSibling.nextElementSibling.rowSpan += 1;
        }
        // 短期
        td = document.querySelectorAll('.service-desc a');
        if (td.length > 1) {
            td = document.querySelectorAll('.oshort');
            tgtEl = td[td.length - 2];
            tgtEl.rowSpan += 1;
            tgtEl.nextElementSibling.rowSpan += 1;
        } else {
            tgtEl.nextElementSibling.nextElementSibling.nextElementSibling.rowSpan += 1;
            tgtEl.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.rowSpan += 1;
        }
    }

    writeServiceKind(targetEl, item) {
        // 親ノード
        let parentEl = targetEl.parentNode;
        // 値の設定
        targetEl.innerHTML = item.value1;
        targetEl.colSpan = 1;
        const addNode = element `<td rowspan="1">${item.value}</td>`;
        let next = targetEl.nextElementSibling;
        insertRender(addNode, parentEl, next);
        // サービス事業所のa追加
        const addTdLongElement = element `<td colSpan="2" class="service-corp"><a href="add06_corp.html">+ 項目を追加</a></td>`;
        insertRender(addTdLongElement, parentEl, next);
        // 後ろの横結合を変更（固定）
        next.remove();
        // サービス種別の追加項目
        const addNeedsElement = element `<tr><td class="data">&nbsp;</td><td colspan="2" rowspan="1" class="service-kind"><a href="add05_kind.html">+ 項目を追加1</a></td><td class="data_gr_bottom" colspan="2">&nbsp;</td><td class="data_gr_corner">&nbsp;</td></tr>`;
        parentEl = document.querySelector("#t-body");
        let lastChild = parentEl.lastElementChild.previousSibling.previousSibling.previousSibling;
        insertRender(addNeedsElement, parentEl, lastChild);
        //
        // ニーズ
        let tgtEl = document.getElementsByClassName('needa');
        tgtEl = tgtEl[tgtEl.length - 2];
        tgtEl.rowSpan += 1;
        // 長期
        let td = document.querySelectorAll('.olong');
        if (td.length > 1) {
            let longTd = td[td.length - 2];
            longTd.rowSpan += 1;
            longTd.nextElementSibling.rowSpan += 1
        } else {
            tgtEl.nextElementSibling.rowSpan += 1;
            tgtEl.nextElementSibling.nextElementSibling.rowSpan += 1;
        }
        // 短期
        td = document.querySelectorAll('.oshort');
        if (td.length > 1) {
            tgtEl = td[td.length - 2];
            tgtEl.rowSpan += 1;
            tgtEl.nextElementSibling.rowSpan += 1
        } else {
            tgtEl.nextElementSibling.nextElementSibling.nextElementSibling.rowSpan += 1;
            tgtEl.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.rowSpan += 1;
        }
        // サービス内容
        td = document.querySelectorAll('.service-desc');
        if (td.length > 1) {
            tgtEl = td[td.length - 2];
            tgtEl.rowSpan += 1;
        } else {
            tgtEl.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.rowSpan += 1;
        }
    }

    writeServiceCorp(targetEl, item) {
        // 親ノード
        let parentEl = targetEl.parentNode;
        // 値の設定
        targetEl.innerHTML = item.value;
        targetEl.colSpan = 1;
        let addNode = element `<td rowspan="1">${item.kikan}</td>`;
        let next = targetEl.nextElementSibling;
        insertRender(addNode, parentEl, next);
        let addNode2 = element `<td rowspan="1">${item.hind}</td>`;
        insertRender(addNode2, parentEl, addNode);
        // 後ろの横結合を変更（固定）
        next.remove();
        // サービス事業所の追加項目
        const addNeedsElement = element `<tr><td class="data">&nbsp;</td><td colspan="2" class="service-corp"><a href="add06_corp.html">+ 項目を追加1</a></td><td class="data_gr_corner">&nbsp;</td></tr>`;
        parentEl = document.querySelector("#t-body");
        let lastChild = parentEl.lastElementChild.previousSibling.previousSibling.previousSibling.previousSibling;
        insertRender(addNeedsElement, parentEl, lastChild);
        //
        // ニーズ
        let tgtEl = document.getElementsByClassName('needa');
        tgtEl = tgtEl[tgtEl.length - 2];
        tgtEl.rowSpan += 1;
        // 長期
        let td = document.querySelectorAll('.olong');
        if (td.length > 1) {
            let longTd = td[td.length - 2];
            longTd.rowSpan += 1;
            longTd.nextElementSibling.rowSpan += 1
        } else {
            tgtEl.nextElementSibling.rowSpan += 1;
            tgtEl.nextElementSibling.nextElementSibling.rowSpan += 1;
        }
        // 短期
        td = document.querySelectorAll('.oshort');
        if (td.length > 1) {
            tgtEl = td[td.length - 2];
            tgtEl.rowSpan = tgtEl.rowSpan + 1;
            tgtEl.nextElementSibling.rowSpan += 1
        } else {
            tgtEl.nextElementSibling.nextElementSibling.nextElementSibling.rowSpan += 1;
            tgtEl.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.rowSpan += 1;
        }
        // サービス内容
        td = document.querySelectorAll('.service-desc');
        if (td.length > 1) {
            tgtEl = td[td.length - 2];
            tgtEl.rowSpan += 1;
        } else {
            tgtEl.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.rowSpan += 1;
        }
        // サービス種別
        td = document.querySelectorAll('.service-kind');
        if (td.length > 1) {
            tgtEl = td[td.length - 2];
            tgtEl.rowSpan = tgtEl.rowSpan + 1;
            tgtEl.nextElementSibling.rowSpan += 1;
        } else {
            let i = tgtEl.nextElementSibling.nextElementSibling.rowSpan;
            tgtEl.nextElementSibling.nextElementSibling.rowSpan += 1;
            tgtEl.nextElementSibling.nextElementSibling.nextElementSibling.rowSpan += 1;
        }
    }
}

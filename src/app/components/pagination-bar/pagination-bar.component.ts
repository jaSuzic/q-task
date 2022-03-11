import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-pagination-bar',
    templateUrl: './pagination-bar.component.html',
    styleUrls: ['./pagination-bar.component.css']
})
export class PaginationBarComponent implements OnInit {

    @Input() set numberOfPages(numberOfPages: number) {
        this.pageNumbers = [...Array(numberOfPages).keys()].map(num => num + 1);
        this.activePage = 1;
    };
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    pageNumbers: number[];
    activePage: number = 1;

    constructor() { }

    ngOnInit(): void {
    }

    onChangePage(number: number) {
        this.pageChanged.emit(number);
        this.activePage = number;
    }

    onClickNext() {
        this.onChangePage(this.activePage + 1);
    }

    onClickPrev() {
        this.onChangePage(this.activePage - 1);
    }

}

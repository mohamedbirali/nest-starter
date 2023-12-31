import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {
    IAction,
    IActionName,
    IColumn,
    IEmittedAction,
    IToggle
} from "@ea/common/ui/components/datasource/datasource";
import { Observable, map, } from 'rxjs';
import { DatasourceService } from "@ea/common/ui/components/datasource/datasource.service";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { stagger40ms } from "@ea/animations/stagger.animation";
import { fadeInUp400ms } from "@ea/animations/fade-in-up.animation";
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { tuiAvatarOptionsProvider, TuiAvatarModule } from '@taiga-ui/kit';
import { FuseMediaWatcherService } from "@fuse/services/media-watcher";
import { Avatars } from "@ea/models/avatars.model";

// todo: delete this import of ManagaementComponent
import { ManagementComponent } from "app/main/management/management.component";
import { OneToOnePipe } from "./datasource.pipe";
import { EaPhonePipe } from "../../../pipes/phone.pipe";
import { EaTruncatePipe } from "../../../pipes/truncate.pipe";
import { MatDividerModule } from "@angular/material/divider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { EaStackAvatarComponent } from "../../blocks/stack-avatar/stack-avatar.component";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TuiLetModule } from "@taiga-ui/cdk";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FuseCardModule } from "../../../../../@fuse/components/card/card.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AsyncPipe, NgClass, NgFor, NgIf, NgStyle, TitleCasePipe } from "@angular/common";
import { EaFormsModule } from "@ea/shared-3rd/form/forms.module";


@Component({
    selector: 'ea-datasource',
    templateUrl: './datasource.component.html',
    styleUrls: ['./datasource.component.scss'],
    providers: [
        // todo: create a separated component
        tuiAvatarOptionsProvider({
            autoColor: true,
            rounded: true,
            size: 'm', // size: 's', // if set just one letter will be shown !
        }),
    ],
    animations: [
        stagger40ms,
        fadeInUp400ms,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        AsyncPipe,
        TitleCasePipe,
        NgClass,
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        TuiLetModule,
        MatTableModule,
        MatSortModule,
        CdkDropList,
        CdkDrag,
        MatCheckboxModule,
        ClipboardModule,
        TuiAvatarModule,
        EaStackAvatarComponent,
        MatSlideToggleModule,
        CdkDragPlaceholder,
        MatPaginatorModule,
        MatDividerModule,
        EaTruncatePipe,
        EaPhonePipe,
        OneToOnePipe,
        EaFormsModule,
        NgIf,
        NgFor,
        NgClass,
        NgStyle,
    ],
})
export class EaDatasourceComponent<T> implements OnInit, AfterViewInit {
    // template //
    // note: DONT use any *ngIf when getting a ref with @ViewChild
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    sharedCssClasses = "uppercase cursor-grabbing bg-default text-disabled text-sm";
    thColumnCss = `max-h-12 justify-start ${this.sharedCssClasses}`
    tableCssClasses = {
        checkBox: {
            th: "max-h-10 max-w-14 h-8 text-center p-0 bg-default",
            td: "max-w-14 max-h-8 text-center p-0",
        },
        common: {
            th: `${this.thColumnCss}`
        },
        shared: {
            th: `${this.sharedCssClasses}`,
        },
        image: {
            th: `max-w-12 pl-2 pr-2 ${this.sharedCssClasses}`,
        },
    };

    // inputs and outputs //
    @Input()
    data$: Observable<T[]>;
    @Input()
    columns: IColumn<T>[];
    @Input()
    actions: IAction[];
    @Input()
    separatedAction: boolean = true; // todo: change type if needed
    @Input()
    listName: string;
    @Input()
    isSidebar: boolean = false;

    @Output()
    emittedAction =
        new EventEmitter<IEmittedAction<T>>(null);
    @Output()
    emittedToggling =
        new EventEmitter<IToggle<T>>(null);
    @Output()
    deleteMany =
        new EventEmitter<T[]>(null);
    @Output()
    updateStackAvatars =
        new EventEmitter<T>(null);

    // parameters //
    public selection =
        new SelectionModel<T>(true, []);
    public placeholder: string = '';
    public pageSize = 5;
    public pageSizeOptions: number[] = [5, 10, 25, 100];

    // obs$ //
    public datasource$: Observable<MatTableDataSource<T>>;
    public mainCheckBox$: Observable<boolean>;
    public isAll$: Observable<boolean>;

    // search form //
    public searchForm!: FormGroup;
    public searchCtrl!: FormControl<string>;

    // helpers //
    public originalLength: number = 0;
    public onMediaChange$: Observable<string[]>;
    temp: T;

    // getters //
    get visibleColumns () {
        return this.columns
            .filter(column => column.visible)
            .map(column => column.property);
    }

    // constructor //
    constructor (
        private _datasourceService: DatasourceService,
        private _formBuilder: FormBuilder,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        @Optional() public managementComponent: ManagementComponent,
    ) { }

    // hooks //
    ngOnInit () {
        this._initForm();
        this._initMediaWatcher$();
        this._initHelpers();
    }

    private _initMediaWatcher$ () {
        this.onMediaChange$ = this._fuseMediaWatcherService.onMediaChange$
            .pipe(
                map(({ matchingAliases }) => matchingAliases)
            );
    }

    ngAfterViewInit (): void {
        this._initObs$();
    }

    // public methods //
    public handleUpdateAvatars (practices: Avatars[], row) {
        row.practices = JSON.stringify(practices);
        const button = document.createElement('button');
        button.addEventListener('click', () => {
            this.updateStackAvatars.emit(row)
        });
        button.click();
    }

    deleteRowSelected (rowsT: T[]) {
        this.deleteMany.emit(rowsT);
        this.onChangeCheckBox(false);
    }

    public onChangeCheckBox (isChecked?: boolean) {
        this.mainCheckBox$ = this._datasourceService.onChangeMainBox(
            this.isAll$,
            this.datasource$,
            this.selection,
            isChecked
        );
    }

    public toggleSelection (rowPatient: T) {
        this.selection.toggle(rowPatient);
        this.onChangeCheckBox(undefined);
    }

    public toggleColumnVisibility (column: IColumn<T>, event: any) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        column.visible = !column.visible;
    }

    // if a column has type checkbox(toggle)
    // toggling
    public toggle (rowType: T, columnName: string, { checked }) {
        this.emittedToggling.emit({
            rowType,
            checked,
            columnName, // parent updates this specific column
        });
    }

    public chooseAction (actionName: IActionName, rowType?: T) {
        this.emittedAction.emit({
            actionName,
            type: rowType ?? null,
        });
    }

    public trackByProperty (index: number, column: IColumn<T>) {
        return column.property;
    }

    /**
     * @description
     * Drag and drop doesn't work correctly inside a DATATABLE if:
     * 1- Any column is invisible (columns array length changed)
     *  => So rows won't be dropped if table's columns are sortable or connected to paginator
     * 2- Rows have a placeholder then columns placeholder won't be applicable (it will work vertically)
     */
    public drop (event: CdkDragDrop<string[]>) {
        moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    }

    // private methods //
    private _initForm () {
        this.searchCtrl = this._formBuilder.control('', []);
        this.searchForm = this._formBuilder.group({
            search: this.searchCtrl,
        });
        this._initPlaceholder();
    }

    private _initHelpers () {
        this.originalLength = this.visibleColumns.length;
    }

    private _initPlaceholder () {
        this.columns.forEach(
            (column) => {
                this.placeholder += `${column}, `;
            }
        );
        this.placeholder = `Rechercher par ${this.placeholder.slice(0, this.placeholder.length - 2)}...`;
    }

    private _initObs$ () {
        this.datasource$ = this._datasourceService.init(
            this.data$,
            this.paginator,
            this.sort,
            this.searchCtrl,
        );

        this.isAll$ = this._datasourceService.isAll$(
            this.datasource$, this.selection
        );

        this.onChangeCheckBox();
    }
}
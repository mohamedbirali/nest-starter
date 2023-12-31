import { MatPaginator } from '@angular/material/paginator';
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { combineLatest, map, Observable, startWith } from "rxjs";
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Injectable()
export class DatasourceService { // DatasourceService<Type>
    constructor() {}

    init<N>(
        data$: Observable<N[]>,
        paginator: MatPaginator,
        sort: MatSort,
        ctrl: AbstractControl,
    ): Observable<MatTableDataSource<N>> {
        const search$ = ctrl.valueChanges.pipe(
            startWith(ctrl.value),
            map(
              (value) => value.trim().toLowerCase()
            ),
          );
      
          return combineLatest([
            search$,
            data$,
          ]).pipe(
            map(
              ([search, data]) => {
                const datasource = new MatTableDataSource<N>(data);
                datasource.paginator = paginator;
                datasource.sort = sort;
                datasource.filter = search;
                return datasource;
              }
            )
          );
    }

    isAll$<N>(
        datasource$: Observable<MatTableDataSource<N>>,
        selection: SelectionModel<N>,
    ): Observable<boolean> {
        return datasource$.pipe(
            map((datasource) => {
              return datasource.data.length === selection.selected?.length
            }),
          );
    }

    onChangeMainBox<N>(
        isAll$: Observable<boolean>,
        datasource$: Observable<MatTableDataSource<N>>,
        selection: SelectionModel<N>,
        isChecked?: boolean,
    ): Observable<boolean> {
        return combineLatest([
            isAll$,
            datasource$
          ]).pipe(
            map(
              ([isAll, datasource]) => {
                if (isChecked) {
                  datasource.data.forEach((row) => selection.select(row));
                } else if (isChecked === false) {
                  selection.clear();
                  return isChecked;
                }
                return isChecked || isAll;
              }
            )
          );
    }
}
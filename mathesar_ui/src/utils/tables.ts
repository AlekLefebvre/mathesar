import type { TableEntry } from '@mathesar/api/tables';
import type { ProcessedColumn } from '@mathesar/stores/table-data';

export function isTableImportConfirmationRequired(table: TableEntry): boolean {
  /**
   * table.import_verified can be null when tables have been
   * manually added to the db/already present in db in which
   * case we should not ask for re-confirmation.
   */
  return (
    table.import_verified === false &&
    table.data_files !== undefined &&
    table.data_files.length > 0
  );
}

export function orderProcessedColumns(processedColumns: Map<number, ProcessedColumn>, columnOrder: number[]):Map<number, ProcessedColumn> {
  const allColumns = [...processedColumns.values()];
  const orderedColumns = new Map<number, ProcessedColumn>();
    columnOrder.forEach((id) => {
    const index = allColumns.map(column => column.id).indexOf(id);
    if (index !== -1) {
      const orderColumn = allColumns.splice(index, 1)[0]
      orderedColumns.set(orderColumn.id, orderColumn);
    }
  });
  allColumns.forEach(column => orderedColumns.set(column.id, column))
  return orderedColumns;
}
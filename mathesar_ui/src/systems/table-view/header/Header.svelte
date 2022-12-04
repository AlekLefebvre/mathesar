<script lang="ts">
  import {
    getTabularDataStoreFromContext,
    ID_ADD_NEW_COLUMN,
    ID_ROW_CONTROL_COLUMN,
  } from '@mathesar/stores/table-data';
  import type { Column } from '@mathesar/api/tables/columns';
  import {
    SheetHeader,
    SheetCell,
    SheetCellResizer,
    isColumnSelected,
  } from '@mathesar/components/sheet';
  import HeaderCell from './header-cell/HeaderCell.svelte';
  import NewColumnCell from './new-column-cell/NewColumnCell.svelte';
  import type { ProcessedColumn } from '@mathesar/stores/table-data';
  import { saveDisplayOptions } from '@mathesar/stores/tables';
  const tabularData = getTabularDataStoreFromContext();

  export let hasNewColumnButton = false;

  $: ({ columnsDataStore, selection, processedColumns, display, id } = $tabularData);
  $: ({ displayOptions } = display);
  $: ({ column_order = [] } = displayOptions);
  $: ({ columns } = columnsDataStore);
  $: ({ selectedCells, columnsSelectedWhenTheTableIsEmpty } = selection);
  let draggedColumn: ProcessedColumn;
  let dragHoverColumn: ProcessedColumn;

  function addColumn(e: CustomEvent<Partial<Column>>) {
    void columnsDataStore.add(e.detail);
  }

  function dragStart(e: DragEvent, column: ProcessedColumn) {
    console.log("start drag");
    console.log(column);
    draggedColumn = column;
  }

  function dropColumn(e: DragEvent, column: ProcessedColumn) {
    console.log("drop column");
    console.log(e);
    console.log(column);
    console.log(column_order);
    for (let column_id of $processedColumns.keys())  {
      if (!column_order.includes(column_id)) {
        column_order.push(column_id);
      }
    }
    console.log(column_order);
    column_order.splice(column_order.indexOf(draggedColumn.id), 1);
    column_order.splice(column_order.indexOf(column.id), 0, draggedColumn.id);
    console.log(column_order);
    saveColumnOrder(table, column_order);//
  }

  function dragEnter(e: DragEvent, column: ProcessedColumn) {
    console.log("drag enter");
    console.log(e);
    console.log(column)
    dragHoverColumn = column;
  }

  function dragLeave(e: DragEvent) {
    console.log("drag leave");
    console.log(e);
  }

  function isColumnDragOver(column: ProcessedColumn) {
    if (column && dragHoverColumn) {
      return column.id == dragHoverColumn.id;
    }
    return false;
  }

  async function handleTableNameChange(name: string): Promise<void> {
    
  }
</script>

<SheetHeader>
  <SheetCell
    columnIdentifierKey={ID_ROW_CONTROL_COLUMN}
    isStatic
    isControlCell
    let:htmlAttributes
    let:style
  >
    <div {...htmlAttributes} {style} />
  </SheetCell>

  {#each [...$processedColumns] as [columnId, processedColumn] (columnId)}
    <SheetCell columnIdentifierKey={columnId} let:htmlAttributes let:style>
      <div {...htmlAttributes} {style}>
        <HeaderCell
          {processedColumn}
          isSelected={isColumnSelected(
            $selectedCells,
            $columnsSelectedWhenTheTableIsEmpty,
            processedColumn,
          )}
          isDragOver={isColumnDragOver(processedColumn)}
          on:click={() => selection.toggleColumnSelection(processedColumn)}
          on:dragstart={(e) => dragStart(e, processedColumn)}
          on:dragenter={(e) => dragEnter(e, processedColumn)}
          on:dragleave={(e) => dragLeave(e)}
          on:drop={(e) => dropColumn(e, processedColumn)}
          on:dragover={(e) => {e.preventDefault()}}
        />
        <SheetCellResizer columnIdentifierKey={columnId} />
      </div>
    </SheetCell>
  {/each}

  {#if hasNewColumnButton}
    <SheetCell
      columnIdentifierKey={ID_ADD_NEW_COLUMN}
      let:htmlAttributes
      let:style
    >
      <div {...htmlAttributes} {style}>
        <NewColumnCell columns={$columns} on:addColumn={addColumn} />
      </div>
    </SheetCell>
  {/if}
</SheetHeader>

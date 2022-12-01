<!-- 
  TODO: Implement the loader while renaming
  when implementing rename functionality
  using table inspector
 -->
<script lang="ts">
  import { Button } from '@mathesar-component-library';
  import type { ProcessedColumn } from '@mathesar/stores/table-data';
  import ProcessedColumnName from '@mathesar/components/column/ProcessedColumnName.svelte';
  import CellBackground from '@mathesar/components/CellBackground.svelte';
  export let processedColumn: ProcessedColumn;
  export let isSelected = false;
  export let isDragOver = false;
</script>

<div class:is-dragover={isDragOver}>
  <CellBackground when={isSelected} color="var(--cell-bg-color-row-selected)" />
  <div on:dragstart on:drop on:dragover on:dragenter on:dragleave draggable={isSelected}>
    <Button appearance="ghost" on:click>
      <ProcessedColumnName {processedColumn} />
    </Button>
  </div>
</div>

<style lang="scss">
  div {
    width: 100%;

    :global(button.btn) {
      width: 100%;
      padding: 0.26rem 0.5rem;
      font-size: inherit;
    }

    &.is-dragover {
      background-color: yellow;
      margin-left: 20px;
    }
  }
</style>

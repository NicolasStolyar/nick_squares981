class MyTable {
  constructor(size) {
    this.plusRow = document.querySelector('.add_row');
    this.plusCell = document.querySelector('.add_col');
    this.minusRow = document.querySelector('.remove_row');
    this.minusCell = document.querySelector('.remove_col');
    this.table = document.querySelector('.tbl');

    this.plusCell.addEventListener('click', this.addCol.bind(this));
    this.plusRow.addEventListener('click', this.addRow.bind(this));
    this.minusCell.addEventListener('click', this.removeCell.bind(this));
    this.minusRow.addEventListener('click', this.removeRow.bind(this));

    this.minusRow.addEventListener('mousemove', this.cancelRow.bind(this));
    this.minusCell.addEventListener('mousemove', this.cancelCell.bind(this));
    this.table.addEventListener('mousemove', (e) => {
    	 this.movingTable(e); this.visibleButton(e); this.hideTimers(e); });

    this.minusRow.addEventListener('mousemove', this.cancelRow.bind(this));
    this.minusCell.addEventListener('mousemove', this.cancelCell.bind(this));

    for (let i = 0; i < size; i += 1) {
      const addRow = this.table.insertRow(i);
      for (let k = 0; k < size; k += 1) {
        addRow.insertCell(k);
      }
    }
  }

  movingTable(event) {
    clearTimeout(this.hideTimers);
    const { target } = event;
    if (target.tagName !== 'TD') return;
    this.localColumn = target.cellIndex;
    this.localRow = target.parentNode.rowIndex;

    this.minusCell.style.left = `${target.offsetLeft}px`;
    this.minusRow.style.top = `${target.offsetTop}px`;
  }

  addCol() {
    for (let i = 0; i < this.table.rows.length; i += 1) {
      this.table.rows[i].insertCell();
    }
  }

  addRow() {
    this.table.insertRow();
    for (let i = 0; i < this.table.rows[0].cells.length; i += 1) {
      this.table.rows[this.table.rows.length - 1].insertCell(i);
    }
  }

  hideTimers() {
    this.hideTimer = setTimeout(this.concealButton.bind(this), 300);
  }

  concealButton() {
    if (this.minusRow) {
      this.minusRow.style.visibility = 'hidden';
    }
    if (this.minusCell) {
      this.minusCell.style.visibility = 'hidden';
    }
  }

  removeCell() {
    if (this.table.rows[0].cells.length !== 1) {
      for (let i = 0; i < this.table.rows.length; i += 1) {
        this.table.rows[i].deleteCell(this.localColumn);
      }
    }
    this.minusCell.style.display = 'none';
  }

  removeRow() {
    if (this.table.rows.length !== 1) {
	this.table.deleteRow(this.localRow);
	}
    this.minusRow.style.display = 'none';
    }

  cancelRow() {
    clearTimeout(this.hideTimer);
    this.visibleButton();
  }

  cancelCell() {
    clearTimeout(this.hideTimer);
    this.visibleButton();
  }

  visibleButton() {
    if (this.table.rows.length !== 1) {
      this.minusRow.style.visibility = 'visible';
      this.minusRow.style.display = 'block';
    }
    if (this.table.rows[0].cells.length !== 1) {
      this.minusCell.style.display = 'block';
      this.minusCell.style.visibility = 'visible';
    }
  }
}
	window.onload = new MyTable(4);
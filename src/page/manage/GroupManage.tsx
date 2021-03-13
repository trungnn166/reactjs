import React, { useState } from 'react';
import { DataGrid, GridColDef, GridCellParams  } from '@material-ui/data-grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField, InputLabel, TextareaAutosize, Select, MenuItem  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './manage.css';
import CloseIcon from '@material-ui/icons/Close';

const columns: GridColDef[] = [
  { field: 'groupName', headerName: 'Tên nhóm', width: 170 },
  { field: 'createDate', headerName: 'Ngày tạo', width: 150 },
  { field: 'creator', headerName: 'Người tạo', width: 130 },
  { field: 'permission', headerName: 'Quyền', width: 200 },
  { field: 'condition', headerName: 'Điều kiện', width: 200 },
  { field: 'note', headerName: 'Ghi chú', width: 200 },
  {
    field: 'btnEdit',
    headerName: 'Sửa',
    renderCell: (params: GridCellParams) => (
        <EditIcon className="text-primary"/>
    ),
  },
  {
    field: 'btnDelete',
    headerName: 'Xóa',
    renderCell: (params: GridCellParams) => (
        <DeleteIcon className="text-danger"/>
    ),
  },
];

var conditions = [
  { id: 1, labelName: 'Vip', value: '17/10/2019', },
  { id: 2, labelName: 'Đang quan tâm', updateDate: '06/01/2020'},
  { id: 3, labelName: 'SĐT không đúng', updateDate: '06/06/2019'},
  { id: 4, labelName: 'Hẹn mua', updateDate: '14/03/2019'},
  { id: 5, labelName: 'Không có nhu cầu', updateDate: '06/06/2019'},
  { id: 6, labelName: 'Đang thương lượng', updateDate: '25/06/2019'},
];

const rows = [
  { id: 1, groupName: 'Private group', createDate: '17/10/2019', creator: 'admin', permission: 'Quyền 1, Quyền 2', condition: 'Điều kiện 1, Điều kiện 2', note: 'Group 1' },
  { id: 2, groupName: 'nhóm tiềm năng 2', createDate: '06/01/2020', creator: '912965445703101', permission: '', condition: 'Đang quan tâm, Hẹn mua', note: 'có khả năng mua' },
  { id: 3, groupName: 'Không tiềm năng', createDate: '06/06/2019', creator: 'admin', permission: '', condition: 'SĐT không đúng', note: '' },
  { id: 4, groupName: 'Nhóm tiềm năng', createDate: '14/03/2019', creator: 'admin', permission: '', condition: 'Không có nhu cầu, Đang thương lượng', note: 'Nhóm những người hiện tại chưa có như cầu sử dụng dịch vụ' },
];

var infoUsers = [
  {id: 1, text: 'Hiển thị tất cả'},
  {id: 2, text: 'Hiển thị những người được chăm sóc'}
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

    modal: {
      position: 'absolute',
      width: '40%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },

    textField: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
  }),
);

export default function GroupManage() {
  const classes = useStyles();

  const [openModalAdd, setOpenModalAdd] = useState(false);

  const handleOpenModalAdd = () => {
    setOpenModalAdd(true);
  }

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  return (
    <div style={{ height: 400, width: '100%' }} >
      <Button className="btn-add" onClick={handleOpenModalAdd}><AddIcon/></Button>
      <DataGrid rows={rows} columns={columns} pageSize={5} className="mt-20px" hideFooterSelectedRowCount={true}/>
      <Modal open={openModalAdd} onClose={handleCloseModalAdd}>
        <div className={classes.modal}>
          <div className="title-modal">
            <p className="text-right"><CloseIcon onClick={handleCloseModalAdd}/></p>
            <h3 className="text-center">Tạo nhóm</h3>
          </div>
          <div className="content-modal">
            <InputLabel>Tên nhóm</InputLabel>
            <TextField placeholder="Nhập tên nhóm" className={classes.textField}/>
            <InputLabel className="marginTop20px">Điều kiện</InputLabel>
            <Select style={{width: '100%'}} value="0">
              <MenuItem value="0">[Chọn]</MenuItem>
              {conditions.map((condition, i) => {     
                return (<MenuItem value={condition.id}>{condition.labelName}</MenuItem>) 
              })}
            </Select>
            <InputLabel className="marginTop20px">Thông tin người dùng</InputLabel>
            <Select style={{width: '100%'}} value="1">
              {infoUsers.map((inforUser, i) => {     
                return (<MenuItem value={inforUser.id}>{inforUser.text}</MenuItem>) 
              })}
            </Select>
            <InputLabel className="marginTop20px">Mô tả</InputLabel>
            <TextareaAutosize  rowsMin={3} style={{width: '100%', height: '100px'}}/>
          </div>
          <div className="footer-modal">
              <Button className="btn btn-danger" onClick={handleCloseModalAdd}>Hủy</Button>
              <Button className="btn btn-success">Lưu</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
import React, {useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GroupManage from './GroupManage';
import LabelManage from './LabelManage';
import TaskManage from './TaskManage';
import MailHistoryManage from './MailHistoryManage';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import Modal from '@material-ui/core/Modal';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import './manage.css';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    position: 'absolute',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '40%',
    float: 'left'
  },
  
}));

const staffs = [
  {id: 1, name: 'Loan Hoang', isChecked: true},
  {id: 2, name: 'Đỗ Thị Kim Thanh', isChecked: true},
  {id: 3, name: 'Mạnh Hoàng', isChecked: false},
]


export default function ManageScreen() {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModalShareUser, setOpenModalShareUser] = useState(false);
  const [openModalSendMailCustomer, setOpenModalSendMailCustomer] = useState(false);

  const handleOpenModalShareUser = () => {
    setOpenModalShareUser(true);
    handleClose();
  };

  const handleOpenModalSendMailCustomer = () => {
    setOpenModalSendMailCustomer(true);
    handleClose();
  };

  const handleCloseModalShareUser = () => {
    setOpenModalShareUser(false);
  };

  const handleCloseModalSendMailCustomer = () => {
    setOpenModalSendMailCustomer(false);
  };

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleClickSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const BtnAddView = () => {
    return (
      <div style={{'paddingLeft': '5px', 'paddingTop': '5px'}}>
          <Button aria-controls="btn-add-view" aria-haspopup="true" onClick={handleClickSetting} className="btn-add-view">
            <SettingsIcon/>
        </Button>
        <Menu id="btn-add-view" keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleOpenModalShareUser}>Chia người dùng cho nhân viên</MenuItem>
          <MenuItem onClick={handleOpenModalSendMailCustomer}>Gửi email cho người dùng</MenuItem>
        </Menu>
      </div>

    );
  };

  return (
    
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <BtnAddView />
          <Tab label="Quản lý nhóm" {...a11yProps(1)} />
          <Tab label="Quản lý nhãn" {...a11yProps(2)} />
          <Tab label="Quản lý công việc" {...a11yProps(3)} />
          <Tab label="Lịch sử gửi mail" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
        <GroupManage/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LabelManage/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TaskManage/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MailHistoryManage/>
      </TabPanel>

      <Modal open={openModalShareUser} onClose={handleCloseModalShareUser}>
        <div className={classes.modal}>
          <div className="title-modal">
            <p className="text-right"><CloseIcon onClick={handleCloseModalShareUser}/></p>
            <h3 className="text-center">Chia User từ hệ thống cho NVKD</h3>
          </div>
          <form style={{width: '100%', textAlign: 'center'}}>
            <TextField label="Từ ngày" type="date" defaultValue="2021-03-01" className={classes.textField}/>
            <TextField label="Đến ngày" type="date" defaultValue="2021-03-15" className={classes.textField}/>
            <Button className="btn-search"><SearchIcon/></Button>
          </form>
          <div className="content-modal">
            <p>Lựa chọn nhân viên</p>
            {staffs.map((staff, i) => {     
              return (<FormControlLabel control={<Checkbox checked={staff.isChecked}  name="staff[]" />} label={staff.name} color="primary"/>) 
            })}
          </div>
          <div className="footer-modal">
              <Button className="btn btn-danger" onClick={handleCloseModalShareUser}>Hủy</Button>
              <Button className="btn btn-success">Xác nhận</Button>
          </div>
        </div>
      </Modal>

      <Modal open={openModalSendMailCustomer} onClose={handleCloseModalSendMailCustomer}>
        <div className={classes.modal}>
          <div className="title-modal">
            <p className="text-right"><CloseIcon onClick={handleCloseModalSendMailCustomer}/></p>
            <h3 className="text-center">Gửi email</h3>
          </div>
          <div className="content-modal">
            <p>Nội dung email</p>
            <TextareaAutosize  rowsMin={3} style={{width: '100%', height: '100px'}}/>
            <OutlinedInput style={{width: '100%', marginTop: '10px', marginBottom: '10px'}} placeholder="Nhập email tại đây"/>
            <span style={{display: 'inherit', marginBottom: '10px'}}>Hoặc</span><input type="file"/>
            <InputLabel style={{marginTop: '10px', fontSize: '12px'}}>Nhận file excell có tên tiêu đề cột chứa chữ "email"</InputLabel>
          </div>
          <div className="footer-modal">
              <Button className="btn btn-danger" onClick={handleCloseModalShareUser}>Hủy</Button>
              <Button className="btn btn-success">Xác nhận</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
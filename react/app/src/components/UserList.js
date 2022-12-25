import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FixedSizeList } from 'react-window';
import { useState } from 'react';
import { Switch } from '@mui/material';
import UserCard from './UserCard';
import LayerButton from './LayerButton';
import UserForm from './UserForm';
import putUsers from '../models/putUsers';
import postUsers from '../models/postUsers';
import getCustomerData from '../models/getCustomerData';
import deleteUsers from '../models/deleteUsers';

function renderRow(props) {
    const { index, style, data } = props;
    const handleClick = async () => {
        console.log(data[index]);
        if (data.userType === 'users') {
            const trips = await getCustomerData.getTripsByUserName(
                data[index].username,
                data.token
            );
            if (trips) {
                data.setUserTrips(trips);
            } else {
                data.setUserTrips(null);
            }
        }

        data.setUserFormCard(null);
        data.setShowUserFormCard(null);

        const handleClickSaveButton = async (newUserObject) => {
            if (data.userType === 'administrators') {
                await putUsers.putAdmin(newUserObject, data.token);
            } else if (data.userType === 'users') {
                await putUsers.putUser(newUserObject, data.token);
            }

            data.setDetailCard(null);

            data.setUserTrips(null);

            data.setShowUserFormCard(false);

            // Get all users
            data.saveFunction();
        };

        const handleClickDeleteButton = async () => {
            if (data.userType === 'administrators') {
                await deleteUsers.deleteAdmin(data[index].username, data.token);
            } else if (data.userType === 'users') {
                await deleteUsers.deleteCustomer(
                    data[index].username,
                    data.token
                );
            }
        };

        const handleClickChangeButton = () => {
            const handleClickCancelButton = () => {
                data.setUserFormCard(null);
                data.setShowUserFormCard(false);
            };

            const cancelButton = (
                <LayerButton
                    buttonText={'Avbryt'}
                    size={'small'}
                    width={25}
                    handleClick={handleClickCancelButton}
                />
            );
            const userFormCard = (
                <UserForm
                    content={data[index]}
                    cancelButton={cancelButton}
                    editButton={editButton}
                    handleClickSaveButton={handleClickSaveButton}
                />
            );

            data.setUserFormCard(userFormCard);
            data.setShowUserFormCard(true);
            //data.setDetailCard(null);
        };

        const deleteButton = (
            <LayerButton
                buttonText={'Ta bort'}
                size={'small'}
                width={100}
                handleClick={handleClickDeleteButton}
            />
        );

        const editButton = (
            <LayerButton
                buttonText={'Ändra'}
                size={'small'}
                width={25}
                handleClick={handleClickChangeButton}
            />
        );

        data.setDetailCard(
            <UserCard
                content={data[index]}
                editButton={editButton}
                deleteButton={deleteButton}
            />
        );
    };

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemText
                    primary={`${index} - ${
                        data[index].username
                            ? data[index].username
                            : data[index].email
                    }`}
                />
            </ListItemButton>
        </ListItem>
    );
}

function UserList(props) {
    const [showAdmins, setShowAdmins] = useState(props.showAdmins);

    const token = props.token;

    const data = showAdmins
        ? props.userData.adminUserData
        : props.userData.customerUserData;

    const userType = showAdmins ? 'administrators' : 'users';

    data.token = token;

    data.setDetailCard = props.setDetailCard;

    data.setUserFormCard = props.setUserFormCard;

    data.setShowUserFormCard = props.setShowUserFormCard;

    data.saveFunction = props.saveFunction;

    data.userType = userType;

    data.setUserTrips = props.setUserTrips;

    const newUserObject = {
        surname: '',
        lastname: '',
        address: '',
        'billing-address': '',
        username: '',
        pass: '',
        email: '',
        balance: 0,
        status: '',
    };

    const newAdminObject = {
        email: '',
        password: '',
    };

    const onSwitchChange = () => {
        setShowAdmins(!showAdmins);
        props.setDetailCard(null);
        props.setUserTrips(null);
        props.setUserFormCard(null);
    };

    const handleClickSaveNewButton = async (newUserObject) => {
        if (data.userType === 'administrators') {
            await postUsers.registerAdmin(newUserObject, token);
        } else if (data.userType === 'users') {
            await postUsers.registerUser(newUserObject, token);
        }

        data.setDetailCard(null);

        data.setShowUserFormCard(false);

        // Get all users on save
        data.saveFunction();
    };

    const handleClickNewButton = () => {
        const handleClickCancelButton = () => {
            props.setUserFormCard(null);
            props.setShowUserFormCard(false);
        };

        const cancelButton = (
            <LayerButton
                buttonText={'Avbryt'}
                size={'small'}
                width={25}
                handleClick={handleClickCancelButton}
            />
        );
        const userFormCard = (
            <UserForm
                content={showAdmins ? newAdminObject : newUserObject}
                cancelButton={cancelButton}
                handleClickSaveButton={handleClickSaveNewButton}
            />
        );

        props.setUserFormCard(userFormCard);
        props.setShowUserFormCard(true);
        props.setDetailCard(null);
        props.setUserTrips(null);
    };

    return (
        <div>
            <FormGroup sx={{ margin: 1 }}>
                <FormControlLabel
                    control={<Switch onChange={onSwitchChange}></Switch>}
                    label={
                        showAdmins
                            ? 'Växla till kunder'
                            : 'Växla till administratörer'
                    }
                />
            </FormGroup>

            <LayerButton
                handleClick={handleClickNewButton}
                buttonText={'Ny'}
                sx={{ mr: 'auto' }}
            />
            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={data.length}
                overscanCount={5}
                itemData={data}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    );
}

export default UserList;

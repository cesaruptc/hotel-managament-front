import React, {useEffect, useState} from "react";
import styles from "./Users.module.css";
import SuccessfulMessage from "../SuccesfulMessage/SuccessfulMessage.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import {useUsers} from "../../hooks/useUsers.jsx";
import {Icon} from "@iconify/react";
import UserModal from "../UserModal/UserModal.jsx";

const Users = () => {
    const { users, isLoading, error, fetchUsers } = useUsers();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        setFilteredUsers(
            users.filter(
                (user) =>
                    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.role.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{`Error: ${error}`}</div>;
    }

    const handleEditUser = (user) => {
        setSelectedUser(user);
    }
    const handleCloseModal = () => {
        setSelectedUser(null);
    }

    return (
        <div className={styles.usersContainer}>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>Usuarios registrados</div>
                </div>
                <input
                    type="text"
                    placeholder="Buscar usuarios..."
                    value = {searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.userTable}>
                    <thead>
                    <tr>
                        <th>Correo</th>
                        <th>Rol</th>
                        {/*<th>Acciones</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                {/*<td>
                                    <Icon icon="uil:edit"
                                          onClick={() => handleEditUser(user)}
                                          className={styles.editIcon}
                                    ></Icon>
                                </td>*/}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No se encontraron usuarios.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    onClose={handleCloseModal}
                    onEdit={fetchUsers}
                ></UserModal>
            )}
            {successMessage && <SuccessfulMessage message={successMessage} onClose={() => setSuccessMessage("")} />}
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage("")} />}
        </div>
    );
};

export default Users;

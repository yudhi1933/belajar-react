import React, { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CartTitle,
//   CartConctat,
//   CardFooter
// }
// from './src/components/ui/Card';
// import Button from "../../components/ui/Button";
// import Input from "../../components/ui/Input";
import Card, { CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import Button from "../../components/ui/button";
import { InputA } from "../../components/ui/input";

function UserManagement() {
  // State untuk daftar pengguna
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  // State untuk form input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // Fungsi Create (Tambah Pengguna)
  const addUser = () => {
    if (name && email) {
      const newUser = {
        id: users.length + 1,
        name,
        email,
      };
      setUsers([...users, newUser]);
      // Reset form
      setName("");
      setEmail("");
    }
  };

  // Fungsi Update (Edit Pengguna)
  const editUser = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  const updateUser = () => {
    if (name && email) {
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, name, email } : user)));
      // Reset form dan state editing
      setName("");
      setEmail("");
      setEditingUser(null);
    }
  };

  // Fungsi Delete (Hapus Pengguna)
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{editingUser ? "Edit Pengguna" : "Tambah Pengguna"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <InputA placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
            <InputA placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={editingUser ? updateUser : addUser} className="w-full">
            {editingUser ? "Update" : "Tambah"}
          </Button>
        </CardFooter>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Daftar Pengguna</h2>
        {users.map((user) => (
          <Card key={user.id} className="mb-3">
            <CardContent className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={() => editUser(user)}>
                  Edit
                </Button>
                <Button variant="destructive" size="icon" onClick={() => deleteUser(user.id)}>
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserManagement;

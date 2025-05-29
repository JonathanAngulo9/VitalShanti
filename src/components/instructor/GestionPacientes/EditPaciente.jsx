import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from "@mui/material";

export default function EditPaciente({ paciente, modo, open, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        identification: "",
        password: "",
    });

    useEffect(() => {
        if (paciente && modo === "editar") {
            setFormData({ ...paciente, password: "" });
        } else if (modo === "crear") {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                identification: "",
                password: "",
            });
        }
    }, [paciente, modo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
            <DialogTitle>
                {modo === "crear" ? "➕ Nuevo Paciente" : "✏️ Editar Paciente"}
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="firstName"
                            label="Nombre"
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="lastName"
                            label="Apellido"
                            value={formData.lastName}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="phone"
                            label="Teléfono"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="identification"
                            label="Identificación"
                            value={formData.identification}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="password"
                            label="Contraseña"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            disabled={modo === "editar"}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="inherit">
                    Cancelar
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    style={{ backgroundColor: '#A88BEB', color: 'white' }}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

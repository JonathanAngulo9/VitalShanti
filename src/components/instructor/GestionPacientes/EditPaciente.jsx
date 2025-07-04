import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from "@mui/material";

export default function EditPaciente({ paciente, modo, open, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        identification: "",
        age: "",
        medicalConditions: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

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
                age: "",
                medicalConditions: "",
                password: "",
            });
        }
        setErrors({});
    }, [paciente, modo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "El nombre es requerido.";
        if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido.";

        if (!formData.email.trim()) {
            newErrors.email = "El correo es requerido.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Formato de correo inválido.";
        }

        if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido.";
        if (!formData.identification.trim()) newErrors.identification = "La identificación es requerida.";
        if (modo === "crear" && !formData.password.trim()) newErrors.password = "La contraseña es requerida.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave(formData);
        }
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
                            error={!!errors.firstName}
                            helperText={errors.firstName}
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
                            error={!!errors.lastName}
                            helperText={errors.lastName}
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
                            error={!!errors.email}
                            helperText={errors.email}
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
                            error={!!errors.phone}
                            helperText={errors.phone}
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
                            error={!!errors.identification}
                            helperText={errors.identification}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="age"
                            label="Edad"
                            value={formData.age}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            error={!!errors.age}
                            helperText={errors.age}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="medicalConditions"
                            label="Condiciones Médicas"
                            value={formData.medicalConditions}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            error={!!errors.medicalConditions}
                            helperText={errors.medicalConditions}
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
                            error={!!errors.password}
                            helperText={modo === "crear" ? errors.password : ""}
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
                    style={{ backgroundColor: '#A88BEB', color: 'white' }}
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

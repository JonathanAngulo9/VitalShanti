import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

function DetailPaciente({ paciente, onClose }) {
  return (
    <Dialog open={Boolean(paciente)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detalle del Paciente</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          <strong>Nombre:</strong> {paciente.firstName} {paciente.lastName}
        </Typography>
        <Typography variant="body1">
          <strong>Identificación:</strong> {paciente.identification}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {paciente.email}
        </Typography>
        <Typography variant="body1">
          <strong>Teléfono:</strong> {paciente.phone}
        </Typography>
        <Typography variant="body1">
          <strong>Edad:</strong> {paciente.age}
        </Typography>
        <Typography variant="body1">
          <strong>Género:</strong> {paciente.gender}
        </Typography>
        <Typography variant="body1">
          <strong>Condiciones médicas:</strong> {paciente.medicalConditions || "Ninguna"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          style={{ backgroundColor: '#A88BEB', color: 'white' }}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailPaciente;

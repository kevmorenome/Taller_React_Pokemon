import React, {useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
import {usePokemon, type Usuario} from '../context/PokemonContext'

export const RegistroUsuario: React.FC = () =>{
    const { entrenadores, entrenadorActivo, registrarEntrenador, seleccionarEntrenador } = usePokemon();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDoc, setTipoDoc] = useState('CC');
    const [dni, setDni] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [correo, setCorreo] = useState('');
    const [datosPersonales, setDatosPersonales] = useState('');

    const eventoSubmit = [e: React.FormEvent] => {
        e.preventDefault();

        if(!datosPersonales) {
            alert('Aceptar politica de privacidad');
            return;
        }

        const nuevo: Usuario = {
            id: Date.now(),
            nombreCompleto: `${nombre} ${apellido}`,
            documento: {tipo: tipoDoc, numero: dni},
            fechaNacimiento,
            correo,
            datosPersonales,
            fechaRegistro: new Date().toLocaleDateString()
        };

        registrarEntrenador(nuevo);
        Navigate('/pokemon');
    };


return()

}
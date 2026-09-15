import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {usePokemon, type PokemonTarjeta } from '../context/PokemonContext'

export const BuscadorPokemon: React.FC = () =>{
    const { entrenadores, entrenadorActivo, registrarEntrenador, seleccionarEntrenador } = usePokemon();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDoc, setTipoDoc] = useState('CC');
    const [dni, setDni] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [correo, setCorreo] = useState('');
    const [datosPersonales, setDatosPersonales] = useState(false);

    const eventoSubmit = (e: React.FormEvent) => {
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


return(
<div>
    <header>
        <h2> Registro de Entrenadores </h2>
    </header>

    <div>
            <form onSubmit={eventoSubmit}>
                <div id="campo-nombre" className="grupo-campo">
                    <label id="etiqueta-nombre" htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} name="nombre" placeholder="Ingresa tu nombre" required></input>
                </div>

                <div id="campo-apellido" className="grupo-campo">
                    <label id="etiqueta-apellido" htmlFor="apellido">Apellido:</label>
                    <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} name="apellido" placeholder="Ingresa tu apellido" required></input>
                </div>

                <div id="campo-tipo-documento" className="grupo-campo">
                    <label id="etiqueta-tipo-documento" htmlFor="tipo-documento">Tipo de identificación:</label>
                    <select id="tipo-documento" value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)} name="tipo_documento" required>
                        <option value="" disabled selected>Seleccione el tipo de documento</option>
                        <option value="12">Tarjeta de identidad (12)</option>
                        <option value="13">Cédula de ciudadanía (13)</option>
                        <option value="21">Cédula de extranjería (21)</option>
                        <option value="41">Pasaporte (41)</option>
                    </select>
                </div>

                <div id="campo-numero-documento" className="grupo-campo">
                    <label id="etiqueta-numero-documento" htmlFor="numero-documento">Número de identificación:</label>
                    <input type="text" id="numero-documento"  value={dni} onChange={(e) => setDni(e.target.value)} name="numero_documento" placeholder="Ejemplo: 123456789" required></input>
                </div>

                <div id="campo-fecha-nacimiento" className="grupo-campo">
                    <label id="etiqueta-fecha-nacimiento" htmlFor="fecha-nacimiento">Fecha de nacimiento:</label>
                    <input type="date" id="fecha-nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} name="fecha_nacimiento" placeholder="Selecciona tu fecha de nacimiento" required></input>
                </div>

                <div id="campo-email" className="grupo-campo">
                    <label id="etiqueta-email" htmlFor="email">Correo electronico</label>
                    <input type="email" id="email" value={correo} onChange={(e) => setCorreo(e.target.value)} name="email" placeholder="Ingresa tu correo" required></input>
                </div>

                <div id="campo-celular" className="grupo-campo">
                    <label id="etiqueta-celular" htmlFor="celular">Número de celular:</label>
                    <input type="tel" id="celular" name="numero_celular" placeholder="Ejemplo: 3001234567" required></input>
                </div>

                <div id="campo-pais" className="grupo-campo">
                    <label id="etiqueta-pais" htmlFor="pais">País de domicilio:</label>
                    <select id="pais" name="pais_residencia" required>
                        <option value="" disabled>Seleccione un país</option>
                        <option value="249">Estados Unidos (249)</option>
                        <option value="169" selected>Colombia (169)</option>
                        <option value="245">España (245)</option>
                    </select>
                </div>

                <div id="campo-ciudad" className="grupo-campo">
                    <label id="etiqueta-ciudad" htmlFor="ciudad">Ciudad de domicilio:</label>
                    <select id="ciudad" name="ciudad_residencia" required>
                        <option value="" disabled selected>Seleccione una ciudad</option>
                        <optgroup label="Estados Unidos (249)">
                            <option value="US-NY">Nueva York</option>
                            <option value="US-LA">Los Ángeles</option>
                            <option value="US-CH">Chicago</option>
                            <option value="US-HO">Houston</option>
                            <option value="US-MI">Miami</option>
                        </optgroup>
                        <optgroup label="Colombia (169)">
                            <option value="11001">Bogotá, D. C.</option>
                            <option value="05001">Medellín</option>
                            <option value="76001">Cali</option>
                            <option value="08001">Barranquilla</option>
                            <option value="13001">Cartagena</option>
                        </optgroup>
                        <optgroup label="España (245)">
                            <option value="ES-MD">Madrid</option>
                            <option value="ES-BCN">Barcelona</option>
                            <option value="ES-V">Valencia</option>
                            <option value="ES-SE">Sevilla</option>
                            <option value="ES-BI">Bilbao</option>
                        </optgroup>
                    </select>
                </div>

                <div id="campo-politica" className="grupo-campo">
                    <input type="checkbox" id="politica" checked={datosPersonales} onChange={(e) => setDatosPersonales(e.target.checked)} name="politica" required></input>
                    <label id="etiqueta-politica" htmlFor="politica">Acepto la política de tratamiento de datos</label>
                </div>

                <div id="campo-envio" className="grupo-campo">
                    <button id="boton-enviar" type="submit">Enviar</button>
                </div>
            </form>
    </div>
</div>
)};
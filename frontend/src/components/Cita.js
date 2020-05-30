import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const Cita = (props) => {
    if (!props.cita) {
        props.history.push('/');
        return null;
    }

    const eliminarCita = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Una cita eliminada no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                    clienteAxios.delete(`pacientes/${id}`)
                                .then(respuesta => {
                                    props.setConsultar(true);
                                    props.history.push('/');
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                }
            });
    };
    
    return (
        <Fragment>
            <h1 className="my-5">Nombre cita: {props.cita.nombre}</h1>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className="btn btn-success text-uppercase px-5 px-5 font-weight-bold">Volver</Link>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            <div className="p5 list-group-item list-group-item-action flex-column align-items-center">
                                <div className="d-flex w-100 justify-content-between mb-4">
                                        <h3 className="mb-3">{ props.cita.nombre }</h3>
                                        <small className="fecha-alta">
                                            { props.cita.fecha } - { props.cita.hora }
                                        </small>
                                    </div>
                                    <p className="mb-0">
                                        { props.cita.sintomas }
                                    </p>
                                    <div className="contacto py-3">
                                        <p>Dueño: { props.cita.propietario }</p>
                                        <p>Teléfono: { props.cita.telefono }</p>
                                    </div>
                                    <div className="d-flex">
                                        <button
                                            type="button"
                                            className="text-uppercase py-2 px-5 font-wight-bold btn btn-danger col"
                                            onClick={() => eliminarCita(props.cita._id)}
                                        >Eliminar &times;</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(Cita);
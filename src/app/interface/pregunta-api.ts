export interface Respuesta {
    texto: string;      // la respuesta
    isCorrect: boolean; // indicador de si la respuesta es correcta
  }
  

export interface PreguntaApi {
    tipoDePregunta: string;
    //dificultad
    //categoria
    pregunta: string;
    //respuestaCorrecta: string;
    //respuestasIncorrectas: Array<string>;
    respuestas: Array<Respuesta>;
}

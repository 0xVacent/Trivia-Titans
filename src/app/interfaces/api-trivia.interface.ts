export interface ApiTrivia {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];  
}

export interface ApiTriviaResponse {
    response_code: number;
    results: ApiTrivia[];  
}
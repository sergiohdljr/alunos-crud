import type { StudentPayload } from "@/api/student-types"
import { useState } from "react"

export const useTableFilters = () => {
    const [inputFilters, setInputFilters] = useState<StudentPayload>({
        name: "",
        email: "",
        cpf: ""
    })

    const [activeFilters, setActiveFilters] = useState<StudentPayload>({
        name: "",
        email: "",
        cpf: ""
    })

    function applyFilters() {
        setActiveFilters(inputFilters)
    }

    function resetFilters() {
        setInputFilters({
            name: "",
            email: "",
            cpf: ""
        })
        setActiveFilters({
            name: "",
            email: "",
            cpf: ""
        })
    }

    return {
        inputFilters,
        setInputFilters,
        activeFilters,
        applyFilters,
        resetFilters
    }
}

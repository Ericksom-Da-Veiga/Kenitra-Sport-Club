components=("adherant" "adherant-edit" "adherant-add" "sport" "sport-edit" "sport-add" "payement" "payement-edit" "payement-add" "monitors" "monitors-edit" "monitors-adds" "login" "dashboard" "settings" "statistiques")

for component in "${components[@]}"
do
  ng generate component $component
done

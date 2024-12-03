

function pageVisibility(closePage, openPage, num) {

  const personalinfo = document.querySelector(`.${closePage}`)
  personalinfo.classList.add("hidden");

  const selectplan = document.querySelector(`.${openPage}`);
  selectplan.classList.remove("hidden");

  let steps = document.querySelectorAll(".step");
  steps.forEach((step) => {

    if (step.classList.contains(`step${num}`)) {
      step.classList.add("bg-white");
      step.classList.remove("text-white");
      step.classList.add("text-black");

    } else {
      step.classList.remove("bg-white");
      step.classList.add("text-white");
    }
  })
}

let count = 1;

function gotoNextPage() {

  count++;

  if (count === 2) {


    const name = document.querySelector(".form-name");
    const email = document.querySelector(".form-email");
    const phNum = document.querySelector(".form-phNum");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phError = document.getElementById("PhError");

    let valid = true;

    if (name.value.trim() === '') {
      nameError.classList.remove('hidden');
      valid=false;
    } else {
      nameError.classList.add('hidden');
    }

    if (email.value.trim() === '') {
      emailError.classList.remove('hidden');
      valid=false;
    } else {
      emailError.classList.add('hidden');
    }

    if (phNum.value.trim() === '') {
      phError.classList.remove('hidden');
      valid = false;
    } else {
      phError.classList.add('hidden');
    }

    if(valid){
      pageVisibility('personalInfo', 'selectplan', count);
    }else{
      count=1;
    }
  }

  else if (count === 3) { pageVisibility('selectplan', 'pick-add-ons', count) }

  else if (count === 4) { pageVisibility('pick-add-ons', 'finishing-up', count) }

  else if (count === 5) { pageVisibility('finishing-up', 'thankyou', count) }

}

function gotoPreviousPage() {

  count--;

  if (count === 2) { pageVisibility('pick-add-ons', 'selectplan', count) }

  else if (count === 1) { pageVisibility('selectplan', 'personalInfo', count) }

  else if (count === 3) { pageVisibility('finishing-up', 'pick-add-ons', count) }

}

document.getElementById("nextPage").addEventListener('click', gotoNextPage);

document.getElementById("selectplan-previousButton").addEventListener('click', gotoPreviousPage);

document.getElementById("selectplan-nextButton").addEventListener('click', gotoNextPage);

document.getElementById("add-ons-previousButton").addEventListener('click', gotoPreviousPage);

document.getElementById("add-ons-nextButton").addEventListener('click', gotoNextPage);

document.getElementById("finishup-previousPage").addEventListener('click', gotoPreviousPage);

document.getElementById("finishup-nextPage").addEventListener('click', gotoNextPage);

document.querySelector(".goToPlanPage").addEventListener('click', () => {

  count = 2;
  pageVisibility('finishing-up', 'selectplan', count);

})


let selectedPlanKey = "arcade"; 
let selectedAddOnKeys = []; 
let isYearly = false; 

const planNameAndCosts = {
  arcade: { name: "Arcade (Monthly)", cost: "$9/mo" },
  advanced: { name: "Advanced (Monthly)", cost: "$12/mo" },
  pro: { name: "Pro (Monthly)", cost: "$15/mo" }
};

const monthlyCost = ['$9/mo', '$12/mo', '$15/mo'];
const yearlyCost = ['$90/yr', '$120/yr', '$150/yr'];

const addOnsCosts = {
  onlineService: { monthly: "+$1/m", yearly: "+$10/y" },
  largerStorage: { monthly: "+$2/m", yearly: "+$20/y" },
  customizeProfile: { monthly: "+$2/m", yearly: "+$20/y" },
};


function finishUpPage(plan) {
  document.querySelector(".finishup-plan-name").textContent = plan.name;
  document.querySelector(".finishup-plan-cost").textContent = plan.cost;
}


function switchPlan(planKey) {
  selectedPlanKey = planKey;

  document.querySelectorAll(".arcade, .advanced, .pro").forEach(plan => {
    plan.classList.remove("border-black");
  });
  document.querySelector(`.${planKey}`).classList.add("border-black");

  finishUpPage(planNameAndCosts[planKey]);
}

function updatePlanCosts() {
  document.querySelectorAll(".cost").forEach((option, index) => {
    const cost = isYearly ? yearlyCost[index] : monthlyCost[index];
    option.textContent = cost;
    option.nextElementSibling.classList.toggle("invisible", !isYearly);


    if (index === 0) planNameAndCosts.arcade.cost = cost;
    if (index === 1) planNameAndCosts.advanced.cost = cost;
    if (index === 2) planNameAndCosts.pro.cost = cost;
  });

  Object.keys(planNameAndCosts).forEach(key => {
    planNameAndCosts[key].name = `${key.charAt(0).toUpperCase() + key.slice(1)} (${isYearly ? "Yearly" : "Monthly"})`;
  });

  finishUpPage(planNameAndCosts[selectedPlanKey]);

}

function updateFinishUpAddOns(planKey, isChecked) {

  const finishUpElement = document.querySelector(`.finish${planKey}`);
  console.log(finishUpElement);
  const costElement = document.querySelector(`.${planKey}-cost`);
  console.log(costElement.textContent);

  if (isChecked) {

    finishUpElement.classList.remove("hidden");

    costElement.textContent = isYearly ? addOnsCosts[planKey].yearly : addOnsCosts[planKey].monthly;
    console.log(costElement.textContent);
  } else {

    finishUpElement.classList.add("hidden");
  }
  finishupPageFinalCostUpdate();
}

function updateAddOnsPageCosts() {

  const costs = document.querySelectorAll(".add-on-cost");
  const values = ['onlineService', 'largerStorage', 'customizeProfile'];

  costs.forEach((cost, index) => {
    console.log(`past ${cost.textContent}`);
    cost.textContent = isYearly ? addOnsCosts[values[index]].yearly : addOnsCosts[values[index]].monthly;
    console.log(`first ${cost.textContent}`);

  })

  document.querySelectorAll(".add-ons input[type='checkbox']").forEach(checkbox => {

    const planKey = checkbox.closest("div");
    checkbox.checked ? planKey.classList.add('border-blue-500') : planKey.classList.remove('border-blue-500');

  });
}

document.querySelector(".toggle").addEventListener("click", () => {
  isYearly = !isYearly;

  const toggleBall = document.querySelector(".toggleBall");
  toggleBall.classList.toggle("translate-x-5", isYearly);
  toggleBall.classList.toggle("-translate-x-0", !isYearly);

  updatePlanCosts();

  document.querySelectorAll(".add-ons input[type='checkbox']").forEach(checkbox => {
    if (checkbox.checked) {
      //const planKey = checkbox.closest("div")
      const planKey = checkbox.closest("div").classList[1];
      console.log(planKey);
      updateAddOnsPageCosts();
      updateFinishUpAddOns(planKey, true);
    }
  });

});


document.querySelector(".arcade").addEventListener("click", () => switchPlan("arcade"));
document.querySelector(".advanced").addEventListener("click", () => switchPlan("advanced"));
document.querySelector(".pro").addEventListener("click", () => switchPlan("pro"));


document.querySelectorAll(".add-ons input[type='checkbox']").forEach(checkbox => {
  checkbox.addEventListener("change", event => {
    const planKey = event.target.closest("div").classList[1]; // Get the class name representing the plan key
    console.log(planKey);
    updateAddOnsPageCosts();
    updateFinishUpAddOns(planKey, event.target.checked);
  });
});

function finishupPageFinalCostUpdate() {

  const finalCost = document.querySelectorAll(".finishupcost");
  let total = 0;
  finalCost.forEach((cost) => {

    if (cost.closest('div').classList.contains("hidden")) {

    } else {
      let content = cost.textContent;
      let result = content.slice(content.indexOf('$') + 1, content.indexOf('/'));
      total += parseInt(result);
    }

  })
  const getFinalCost = document.querySelector('.total-cost');
  isYearly ? getFinalCost.innerHTML = `+$${total}/yr` : getFinalCost.innerHTML = `+$${total}/m`;
}
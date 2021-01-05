# Domain Objects

## <User>
  
    - can be logged in with
    - answer existing <Poll>
    - create new <Poll>

## <Poll>

# Functions

## Login as <User>
## Logout

    
# UIs

## Login Screen

## Navigation / Header
    -> Home
    -> New Question
    -> LeaderBoard
    - [authedUser info]
    -> Logout 

## [HomeScreen / Dashboard]
### Views
    - Overview / List unanswered <Question>s
    - Overview / List answered <Question>s
### Actions
    - click on question list items opens it in [QuestionDetailScreen]    

## [QuestionDetailScreen]
### Views 
    ** <OptionView>
        - Results
        - Option (2x)
            - Text
            - Votes
            - voted by authedUser
    ** <OptionEdit>
        - Option (2x)
            - Text
            - 
    - text of both options
    - votes on option
    - mark the option that is already selected by auth user
    - name and avatar of question creator
### Actions
    - click marks the selected option of authed user and returns to [HomeScreen]     
    

## [New Question Screen]
